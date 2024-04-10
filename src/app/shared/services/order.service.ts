import { Injectable, WritableSignal } from '@angular/core';
import { MenuItem } from '../models/menu.model';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { tap } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { RealtimeService } from './realtime.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly key: string = 'myOrders';
  public myOrders: OrderModel[] = [];

  constructor(
    public realtime_: RealtimeService,
    private login_: LoginService,
    private httpClient_: HttpClient,
    private router_: Router,
  ) {}

  public makeLocalOrder(cart: WritableSignal<MenuItem[]>, table: string) {
    const items: string[] = [];
    const quantity: Record<string, number> = {};
    
    cart().forEach(entry => {
      items.push(entry.id);
      quantity[entry.id] = <number>entry.quantity;
    });

    let order;
    if (this.login_.isLogin()) order = { items, quantity, table, username: JSON.parse(<string>localStorage.getItem('user')).id };
    else order = { items, quantity, table };

    this.httpClient_.post(`${environment.baseURL}/api/collections/local_orders/records`, { ...order, state: 'pending' })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tap((response: any) => {
          let myOrders = response.id;
          if (localStorage.getItem('myUnRegisteredOrders')) myOrders += '.' + localStorage.getItem('myUnRegisteredOrders')
          localStorage.setItem('myUnRegisteredOrders', myOrders);

          // clearing
          cart.set([]);
          localStorage.removeItem('bookedTable');
          localStorage.removeItem('cart');

          // navigate to my-order page
          this.router_.navigate(['/my-orders'])
        })
      ).subscribe();
  }
}
