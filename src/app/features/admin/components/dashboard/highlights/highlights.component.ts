import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

import PocketBase from 'pocketbase';

interface Highlights {
  total: number;
}

@Component({
  selector: 'qd-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['../dashboard.component.scss']
})
export class HighlightsComponent implements OnInit {
  public localOrders: Highlights = { total: 0 };
  public remoteOrders: Highlights = { total: 0 };

  public completedOrders = 0;
  public totalRevenue = 0;
  
  private readonly today = (new Date()).toISOString().split('T')[0];
  private readonly pb = new PocketBase(`${environment.baseURL}`);

  constructor (
    private httpClient_: HttpClient,
  ) {}

  ngOnInit(): void {
    this.count('local_orders', this.localOrders);
    this.realtime('local_orders');

    this.count('remote_orders', this.remoteOrders);
    this.realtime('remote_orders');

    this.countCompletedOrders();
  }

  private count(collection: string, counter: Highlights) {
    const filter = encodeURIComponent(`created~'${this.today}' && state!='cancelled'`);
    this.httpClient_.get(`${environment.baseURL}/api/collections/${collection}/records?filter=${filter}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .subscribe((response: any) => {
      counter.total = response.totalItems;
    });
  }

  private realtime(collection: string): void {
    this.pb.collection(collection).subscribe('*', () => {
      this.count(collection, collection === 'remote_orders' ? this.remoteOrders : this.localOrders);
      this.countCompletedOrders();
      console.log(collection, 'changed');
    });
  }

  private countCompletedOrders(): void {
    this.completedOrders = 0;

    const items: number[] = [];
    this.totalRevenue += items.reduce((acc, value) => acc+value, 0);

    const filter = encodeURIComponent(`created~'${this.today}' && state='completed'`);
    this.httpClient_.get(`${environment.baseURL}/api/collections/local_orders/records?filter=${filter}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .subscribe((response: any) => this.completedOrders += response.totalItems);

    this.httpClient_.get(`${environment.baseURL}/api/collections/remote_orders/records?filter=${filter}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .subscribe((response: any) => this.completedOrders += response.totalItems);

    this.httpClient_.get(`${environment.baseURL}/api/collections/revenue/records?filter=created~'${this.today}'`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .subscribe((response: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.totalRevenue = response?.items.reduce((acc: number, item: any) => acc+item.money, 0);
    });
  }
}
