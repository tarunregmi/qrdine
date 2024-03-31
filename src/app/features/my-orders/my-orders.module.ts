import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';
import { OrderComponent } from './components/order/order.component';
import { FormsModule } from '@angular/forms';
import { LocalOrdersComponent } from './components/local-orders/local-orders.component';
import { RemoteOrdersComponent } from './components/remote-orders/remote-orders.component';


@NgModule({
  declarations: [
    MyOrdersComponent,
    OrderComponent,
    LocalOrdersComponent,
    RemoteOrdersComponent
  ],
  imports: [
    CommonModule,
    MyOrdersRoutingModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatButtonToggleModule,
  ]
})
export class MyOrdersModule { }
