import { Injectable, WritableSignal } from '@angular/core';
import { MenuItem } from '../models/menu.model';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { tap } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { RealtimeService } from './realtime.service';

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
          const myOrders = [{ id: response?.id, items: cart(), table, date: new Date(), state: 'pending' }];
          if (localStorage.getItem(this.key)) myOrders.push(...JSON.parse(<string>localStorage.getItem(this.key)));
          localStorage.setItem(this.key, JSON.stringify(myOrders));
          this.syncMyOrders();
          cart.set([]);
        })
      ).subscribe();
  }

  public cancelOrder(id: string): void {
    this.httpClient_.patch(`${environment.baseURL}/api/collections/local_orders/records/${id}`, { state: 'cancelled'}).subscribe();
  }

  public syncMyOrders() {
    if (localStorage.getItem(this.key)) this.myOrders = JSON.parse(<string>localStorage.getItem(this.key));
  }

  public syncMyOrdersState(): void {
    this.syncMyOrders();
    
    if (this.myOrders.length > 0) {
      this.httpClient_.get(`${environment.baseURL}/api/collections/local_orders/records`)
        .pipe(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tap((response: any) => {
            console.log(response);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.items.forEach((entry: any) => {
              const order = this.myOrders.find(order => order.id === entry.id);
              if (order) {
                order.state = entry.state;
                this.updateMyOrdersInLocal();

                // realtime
                // subscribe order
                if (order.state === 'pending' || order.state === 'confirmed') {
                  this.realtime_.record('local_orders').subscribe(order.id, event => {
                    console.log(event);
                    if (order?.id === event.record.id) {
                      order.state = event.record?.['state'];
                      this.updateMyOrdersInLocal();

                      // un-subscribe order
                      if (order.state === 'cancelled' || order.state === 'completed') {
                        this.realtime_.unsubscribeRecord('local_orders', order.id);
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
    this.realtime_.unsubscribe('local_orders');
  }

  private updateMyOrdersInLocal() {
    localStorage.setItem(this.key, JSON.stringify(this.myOrders));
  }
}
