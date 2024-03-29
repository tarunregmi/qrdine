import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { UserPopupComponent } from 'src/app/shared/components/user-popup/user-popup.component';
import { LocalOrderModel } from 'src/app/shared/models/local.order.model';
import { UserModel } from 'src/app/shared/models/user.model';
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
    public dialog_: MatDialog,
  ) {}

  ngOnInit(): void {
    this.localOrders_.subscribeRealtime();
  }

  public onStateChange(order: LocalOrderModel) {
    this.localOrders_.changeOrderState(order);
  }

  public showUserDetails(user: UserModel) {
    this.dialog_.open(UserPopupComponent, { data: user });
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
