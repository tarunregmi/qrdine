import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyOrderService } from 'src/app/shared/services/my-order.service';

@Component({
  selector: 'qd-remote-orders',
  templateUrl: './remote-orders.component.html',
  styleUrls: ['../../my-orders.component.scss']
})
export class RemoteOrdersComponent implements OnInit, OnDestroy {
  private collection = 'remote_orders';

  constructor(
    public myOrder_: MyOrderService,
  ) {}

  ngOnInit(): void {
    this.myOrder_.subscribeRealtime(this.collection);
  }

  ngOnDestroy(): void {
    this.myOrder_.unSubscribeRealtime(this.collection);
  }
}
