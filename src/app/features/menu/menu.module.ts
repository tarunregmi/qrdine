import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule } from '@angular/forms';
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

import { MenuComponent } from './menu.component';
import { ItemComponent } from './components/item/item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';



@NgModule({
  declarations: [
    MenuComponent,
    ItemComponent,
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
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
  ]
})
export class MenuModule { }
