import { Component, Input } from '@angular/core';
import { OrderModel } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'qd-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() public order!: OrderModel;

  constructor(
    public order_: OrderService
  ) {}

  public readonly displayedColumns = ['title', 'quantity', 'price'];

  public getTotalCost(): number {
    return this.order.items.reduce((aac, currentItem) => (aac + (currentItem.price * <number>currentItem.quantity)), 0);
  }
}
