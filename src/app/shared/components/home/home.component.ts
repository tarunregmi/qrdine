import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'qd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public order_: OrderService,
  ) {}

  ngOnInit(): void {
    this.order_.syncMyOrders();
  }
}
