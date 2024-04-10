import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { UserPopupComponent } from 'src/app/shared/components/user-popup/user-popup.component';
import { RemoteOrderModel } from 'src/app/shared/models/remote.order.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { RemoteOrdersService } from 'src/app/shared/services/remote-orders.service';

@Component({
  selector: 'qd-remote-orders',
  templateUrl: './remote-orders.component.html',
  styleUrls: ['../menu/menu.component.scss'],
  animations: [ fadeIn ],
})
export class RemoteOrdersComponent implements OnInit, OnDestroy  {
  public displayedColumns: string[] = ['items', 'total', 'deliveryAddress', 'user', 'state', 'created'];

  constructor(
    public remoteOrders_: RemoteOrdersService,
    public dialog_: MatDialog,
  ) {}

  ngOnInit(): void {
    this.remoteOrders_.subscribeRealtime();
  }

  public onStateChange(order: RemoteOrderModel) {
    this.remoteOrders_.changeOrderState(order);
  }
  
  /**
   * @description change order when paginator change it's page-index
   */
  public changePage(event: PageEvent) {
    this.refreshOrder(event.pageIndex + 1);
  }

  public showUserDetails(user: UserModel) {
    this.dialog_.open(UserPopupComponent, { data: user });
  }

  ngOnDestroy(): void {
    this.remoteOrders_.unsubscribeRealtime();
  }

  private refreshOrder(page?: number): void {
    if (page) this.remoteOrders_.pageIndex = page;
    this.remoteOrders_.getRemoteOrders();
  }
}
