import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { HighlightsComponent } from './components/dashboard/highlights/highlights.component';
import { GraphComponent } from './components/dashboard/graph/graph.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditMenuPopupComponent } from './components/menu/edit-menu-popup/edit-menu-popup.component';
import { TablesComponent } from './components/dashboard/tables/tables.component';
import { LocalOrdersComponent } from './components/local-orders/local-orders.component';
import { RemoteOrdersComponent } from './components/remote-orders/remote-orders.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AuthComponent,
    HighlightsComponent,
    GraphComponent,
    MenuComponent,
    SidebarComponent,
    EditMenuPopupComponent,
    TablesComponent,
    LocalOrdersComponent,
    RemoteOrdersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ]
})
export class AdminModule { }
