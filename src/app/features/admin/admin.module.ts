import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { HighlightsComponent } from './components/dashboard/highlights/highlights.component';
import { GraphComponent } from './components/dashboard/graph/graph.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AuthComponent,
    HighlightsComponent,
    GraphComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AuthModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class AdminModule { }
