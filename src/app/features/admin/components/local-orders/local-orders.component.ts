import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { LocalOrderModel } from 'src/app/shared/models/local.order.model';
import { LocalOrdersService } from 'src/app/shared/services/local-orders.service';

@Component({
  selector: 'qd-local-orders',
  templateUrl: './local-orders.component.html',
  styleUrls: ['../menu/menu.component.scss'],
  animations: [ fadeIn ],
})
export class LocalOrdersComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['items', 'total', 'table', 'user', 'state', 'created'];

  constructor(
    public localOrders_: LocalOrdersService,
  ) {}

  ngOnInit(): void {
    this.localOrders_.subscribeRealtime();
  }

  public onStateChange(order: LocalOrderModel) {
    this.localOrders_.changeOrderState(order);
  }
  
  /**
   * @description change order when paginator change it's page-index
   */
  public changePage(event: PageEvent) {
    this.refreshOrder(event.pageIndex + 1);
  }

  ngOnDestroy(): void {
    this.localOrders_.unsubscribeRealtime();
  }

  private refreshOrder(page?: number): void {
    if (page) this.localOrders_.pageIndex = page;
    this.localOrders_.getLocalOrders();
  }
}
