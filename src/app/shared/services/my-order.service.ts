import { Injectable } from '@angular/core';
import { RealtimeService } from './realtime.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { forkJoin, tap } from 'rxjs';
import { MenuItem } from '../models/menu.model';
import { RecordModel } from 'pocketbase';
import { Item } from '../models/order.model';

export interface MyOrder {
  id:               string;
  items:            Item[];
  totalPrice:       number;
  table?:           string;
  deliveryAddress?: string;
  state:            string;
  username?:        string;
  created:          string;
}

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {
  public username!: string;  // user id in database
  public myOrders: MyOrder[] = [];
  public myUnRegisteredOrders: string[] | undefined;

  private url!: string;

  constructor(
    private realtime_: RealtimeService,
    private httpClient_: HttpClient,
  ) {}

  public subscribeRealtime(collection: string) {
    this.url = `${environment.baseURL}/api/collections/${collection}/records`

    this.username = JSON.parse(<string>localStorage.getItem('user'))?.id;

    // track un-registered orders in local_orders collection only
    if (collection === 'local_orders') {
      const unRegisteredOrdrs = localStorage.getItem('myUnRegisteredOrders');
      this.myUnRegisteredOrders = unRegisteredOrdrs?.split('.');

      // now namsari
      if (this.username && this.myUnRegisteredOrders) {
        const namsariRequest = this.myUnRegisteredOrders.map(id => this.httpClient_.patch(`${this.url}/${id}`, { username: this.username}))
        forkJoin(namsariRequest)
        .subscribe({
          error: () => console.log('namsari error'),
          complete: () => {
            console.log('All your previouse un-traced order are traced'),
            localStorage.removeItem('myUnRegisteredOrders')
            this.myUnRegisteredOrders = undefined;
            this.getAllMyOrders(collection)
          }
        })
      } else {
        this.getAllMyOrders(collection)
      }

    } else {
      this.myUnRegisteredOrders = undefined;
      this.getAllMyOrders(collection);
    }
  }

  public cancelOrder(id: string): void {
    this.httpClient_.patch(`${this.url}/${id}`, { state: 'cancelled'}).subscribe();
  }

  public unSubscribeRealtime(collection: string) {
    this.realtime_.unsubscribe(collection);
    this.myOrders = [];
  }

  private getAllMyOrders(collection: string) {

    // make query string
    let filterString!: string;
    if (this.username) filterString = `username='${this.username}'`;
    else if (collection === 'local_orders' && <number>this.myUnRegisteredOrders?.length > 0) {
      filterString = <string>this.myUnRegisteredOrders?.reduce((acc, current) => acc + `id='${current}' || `, '').slice(0, -4);
    }
    
    if (filterString) {
      this.httpClient_.get(`${this.url}/?filter=(${filterString})&expand=items,table&sort=-created`)
        .pipe(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tap((response: any) => {
            this.extractInformation(response.items);

            // now track the collection realtime
            this.realtime_.record(collection).subscribe('*', (data) => {
              const changedOrderIndex = this.findOrderIndex(data.record.id);
              console.log(collection, 'changed')
              if (changedOrderIndex >= 0) {
                console.log(data.record['state']);
                this.myOrders[changedOrderIndex].state = data.record['state'];
              }
            });
          })
        ).subscribe();
    }
  }

  // extract necessary infromation from response
  private extractInformation(response: RecordModel[]) {
    response.forEach(record => {
      this.myOrders.push(this.extractOrder(record));
    });
  }

  // extract order
  private extractOrder(response: RecordModel): MyOrder {
    const order: MyOrder = {
      id: response.id,
      items: this.extractItems((response.expand)?.['items'], response['quantity']),
      totalPrice: 0,
      table: (response.expand)?.['table']?.name,
      deliveryAddress: response['deliveryAddress'],
      state: response['state'],
      username: response['username'],
      created: response.created,
    }

    order.totalPrice = this.getTotalCost(order.items);

    return order;
  }

  // extract items in orders
  private extractItems(data: MenuItem[], quantity: Record<string, number>) {
    const reasult: Item[] = [];

    data?.forEach(entry => {
      reasult.push({
        id: entry.id,
        title: entry.title,
        veg: entry.veg,
        price: entry.price,
        quantity: quantity[entry.id],
      })
    });

    return reasult;
  }

  // get total cost
  private getTotalCost(items: Item[]) {
    return items.reduce((acc, item) => (acc + item.price*item.quantity), 0);
  }

  // 
  private findOrderIndex(id: string): number {
    return this.myOrders.findIndex(order => order.id === id);
  }
}
