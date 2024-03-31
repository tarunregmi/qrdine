import { Component, Input } from '@angular/core';
import { MyOrder, MyOrderService } from 'src/app/shared/services/my-order.service';

@Component({
  selector: 'qd-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() public order!: MyOrder;

  constructor(
    public myOrder_: MyOrderService
  ) {}

  public readonly displayedColumns = ['title', 'quantity', 'price'];
}
