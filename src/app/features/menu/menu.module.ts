import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';

import { MenuComponent } from './menu.component';
import { ItemComponent } from './components/item/item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { TableComponent } from './components/table/table.component';
import { OriginPopupComponent } from './components/origin-popup/origin-popup.component';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { RemoteOrdersFormComponent } from './components/remote-orders-form/remote-orders-form.component';
import { FilterPopupComponent } from './components/filter-popup/filter-popup.component';



@NgModule({
  declarations: [
    MenuComponent,
    ItemComponent,
    CartComponent,
    CartItemComponent,
    TableComponent,
    OriginPopupComponent,
    LoginPopupComponent,
    RemoteOrdersFormComponent,
    FilterPopupComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSliderModule,
  ]
})
export class MenuModule { }
