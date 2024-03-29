import { Injectable } from '@angular/core';
import { Item, LocalOrderModel } from '../models/local.order.model';
import { environment } from 'src/environments/environment.development';
import { RealtimeService } from './realtime.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { RecordModel } from 'pocketbase';
import { MenuItem } from '../models/menu.model';
import { QueryParams } from '../models/queryparams.model';

@Injectable({
  providedIn: 'root'
})
export class LocalOrdersService {
  public readonly collection: string = 'local_orders';
  public local_orders: LocalOrderModel[] = [];
  public totalItems = 0;
  public pageIndex = 0;
  public pageSize = 10;

  private url = `${environment.baseURL}/api/collections/${this.collection}/records`;

  constructor(
    private realtime_: RealtimeService,
    private httpClient_: HttpClient,
  ) {}

  public subscribeRealtime(): void {
    this.getLocalOrders();

    this.realtime_.record(this.collection).subscribe('*', () => {
      this.getLocalOrders();
    });
  }

  public unsubscribeRealtime(): void {
    this.local_orders.length = 0;
    this.realtime_.unsubscribe(this.collection);
  }

  public changeOrderState(order: LocalOrderModel) {
    this.httpClient_.patch(`${this.url}/${order.id}`, { state: order.state }).subscribe({
      next: () => {
        if (order.state === 'completed') {
          this.httpClient_.post(`${environment.baseURL}/api/collections/revenue/records`, { money: order.total }).subscribe();
        }
      }
    });
  }

  public getTotalCost(items: Item[]) {
    return items.reduce((acc, item) => (acc + item.price*item.quantity), 0);
  }

  /**
   * @description Get all local orders from database and put them in `local_orders: LocalOrderModel[]`
   */
  public getLocalOrders(): void {
    const queryParameters: QueryParams = { page: 1, perPage: this.pageSize, sort: '-created,updated', expand: 'items,table,username' };
    if (this.pageIndex) queryParameters.page = this.pageIndex;
    
    this.httpClient_.get(this.url, { params: <HttpParams>queryParameters})
    .pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((response: any) => {
        this.totalItems = response?.totalItems;
        this.local_orders = response.items.map((item: RecordModel) => this.order(item));
      })
    ).subscribe();
  }

  /**
   * @description Extract necessary table information
   */
  private order(data: RecordModel): LocalOrderModel {
    const reasult =  {
      id: data.id,
      items: this.items((data.expand)?.['items'], data['quantity']),
      total: 0,
      table: (data.expand)?.['table'].name,
      state: data['state'],
      created: data.created,
      user: (data.expand)?.['username'],
    }

    reasult.total = this.getTotalCost(reasult.items);

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
    return this.local_orders.findIndex(order => order.id === id);
  }
}
