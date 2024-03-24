import { Injectable, WritableSignal } from '@angular/core';
import { MenuItem } from '../models/menu.model';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { pipe, tap } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { RealtimeService } from './realtime.service';

interface item {
  id: string;
  quantity: number;
}

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
  ) {}

  public makeLocalOrder(cart: WritableSignal<MenuItem[]>, table: string) {
    const items: item[] = [];
    cart().forEach(entry => items.push({ id: entry.id, quantity: <number>entry.quantity }));

    let order;
    if (this.login_.isLogin()) order = { items, table, username: JSON.parse(<string>localStorage.getItem('user')).id };
    else order = { items, table };

    this.httpClient_.post(`${environment.baseURL}/api/collections/orders/records`, { ...order, state: 'pending' })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tap((response: any) => {
          const myOrders = [{ id: response?.id, items: cart(), table, date: new Date(), state: 'pending' }];
          if (localStorage.getItem(this.key)) myOrders.push(...JSON.parse(<string>localStorage.getItem(this.key)));
          localStorage.setItem(this.key, JSON.stringify(myOrders));
          this.syncMyOrders();
          cart.set([]);
        })
      ).subscribe();
  }

  public cancelOrder(id: string): void {
    this.httpClient_.patch(`${environment.baseURL}/api/collections/orders/records/${id}`, { state: 'cancelled'}).subscribe();
  }

  public syncMyOrders() {
    if (localStorage.getItem(this.key)) this.myOrders = JSON.parse(<string>localStorage.getItem(this.key));
  }

  public syncMyOrdersState(): void {
    this.syncMyOrders();
    
    if (this.myOrders.length > 0) {
      this.httpClient_.get(`${environment.baseURL}/api/collections/orders/records`)
        .pipe(
          tap((response: any) => {
            console.log(response);
            response.items.forEach((entry: any) => {
              let order = this.myOrders.find(order => order.id === entry.id);
              if (order) {
                order.state = entry.state;
                this.updateMyOrdersInLocal();

                // realtime
                // subscribe order
                if (order.state === 'pending' || order.state === 'confirmed') {
                  this.realtime_.record('orders').subscribe(order.id, event => {
                    console.log(event);
                    if (order?.id === event.record.id) {
                      order.state = event.record?.['state'];
                      this.updateMyOrdersInLocal();

                      // un-subscribe order
                      if (order.state === 'cancelled' || order.state === 'completed') {
                        this.realtime_.unsubscribeRecord('orders', order.id);
                      }
                    }
                  });
                }
              }
            })
          })
        ).subscribe();
    }

    this.updateMyOrdersInLocal();
  }

  public unSubscribeRealtime(): void {
    this.realtime_.unsubscribe('orders');
  }

  private updateMyOrdersInLocal() {
    localStorage.setItem(this.key, JSON.stringify(this.myOrders));
  }
}
