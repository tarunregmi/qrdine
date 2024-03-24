import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';
import { OrderComponent } from './components/order/order.component';


@NgModule({
  declarations: [
    MyOrdersComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    MyOrdersRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ]
})
export class MyOrdersModule { }
