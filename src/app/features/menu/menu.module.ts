import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

import { MenuComponent } from './menu.component';
import { ItemComponent } from './components/item/item.component';



@NgModule({
  declarations: [
    MenuComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,
  ]
})
export class MenuModule { }
