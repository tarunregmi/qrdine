import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyOrderService } from 'src/app/shared/services/my-order.service';

@Component({
  selector: 'qd-local-orders',
  templateUrl: './local-orders.component.html',
  styleUrls: ['../../my-orders.component.scss']
})
export class LocalOrdersComponent implements OnInit, OnDestroy {
  private collection = 'local_orders';

  constructor(
    public myOrder_: MyOrderService,
  ) {}

  ngOnInit(): void {
    // localStorage.setItem('myUnRegisteredOrders', "22qta9g3mkt7ad4.m3zw8n8yp9hcna8");

    this.myOrder_.subscribeRealtime(this.collection);

  }

  ngOnDestroy(): void {
    this.myOrder_.unSubscribeRealtime(this.collection);
  }
}
