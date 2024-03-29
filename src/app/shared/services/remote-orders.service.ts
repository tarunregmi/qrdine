import { Injectable } from '@angular/core';
import { RemoteOrderModel } from '../models/remote.order.model';
import { environment } from 'src/environments/environment.development';
import { RealtimeService } from './realtime.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item } from '../models/order.model';
import { QueryParams } from '../models/queryparams.model';
import { tap } from 'rxjs';
import { RecordModel } from 'pocketbase';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class RemoteOrdersService {
  public readonly collection: string = 'remote_orders';
  public remote_orders: RemoteOrderModel[] = [];
  public totalItems = 0;
  public pageIndex = 0;
  public pageSize = 10;

  private url = `${environment.baseURL}/api/collections/${this.collection}/records`;

  constructor(
    private realtime_: RealtimeService,
    private httpClient_: HttpClient,
  ) {}

  public subscribeRealtime(): void {
    this.getRemoteOrders();

    this.realtime_.record(this.collection).subscribe('*', () => {
      this.getRemoteOrders();
    });
  }

  public unsubscribeRealtime(): void {
    this.remote_orders.length = 0;
    this.realtime_.unsubscribe(this.collection);
  }

  public changeOrderState(order: RemoteOrderModel) {
    this.httpClient_.patch(`${this.url}/${order.id}`, { state: order.state }).subscribe({
      next: () => {
        if (order.state === 'completed') {
          this.httpClient_.post(`${environment.baseURL}/api/collections/revenue/records`, { money: order.totalPrice }).subscribe();
        }
      }
    });
  }

  public getTotalCost(items: Item[]) {
    return items.reduce((acc, item) => (acc + item.price*item.quantity), 0);
  }

  /**
   * @description Get all remote orders from database and put them in `remote_orders: RemoteOrderModel[]`
   */
  public getRemoteOrders(): void {
    const queryParameters: QueryParams = { page: 1, perPage: this.pageSize, sort: '-created,updated', expand: 'items,table,username' };
    if (this.pageIndex) queryParameters.page = this.pageIndex;
    
    this.httpClient_.get(this.url, { params: <HttpParams>queryParameters})
    .pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((response: any) => {
        this.totalItems = response?.totalItems;
        this.remote_orders = response.items.map((item: RecordModel) => this.order(item));
      })
    ).subscribe();
  }

  /**
   * @description Extract necessary order information
   */
  private order(data: RecordModel): RemoteOrderModel {
    const reasult =  {
      id: data.id,
      items: this.items((data.expand)?.['items'], data['quantity']),
      totalPrice: 0,
      state: data['state'],
      created: data.created,
      user: (data.expand)?.['username'],
      deliveryAddress: data['deliveryAddress'],
    }

    reasult.totalPrice = this.getTotalCost(reasult.items);

    return reasult;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private items(data: MenuItem[], quantity: any) {
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

  private findOrderIndex(id: string): number {
    return this.remote_orders.findIndex(order => order.id === id);
  }
}
