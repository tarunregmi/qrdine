import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { LocalOrdersComponent } from './components/local-orders/local-orders.component';
import { RemoteOrdersComponent } from './components/remote-orders/remote-orders.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent, title: 'Admin - Dashboard' },
      { path: 'menu', component: MenuComponent, title: 'Admin - Menu' },
      { path: 'local-orders', component: LocalOrdersComponent, title: 'Admin - Local Orders' },
      { path: 'remote-orders', component: RemoteOrdersComponent, title: 'Admin - Remote Orders' },
    ],
  },
  { path: 'login', component: AuthComponent, title: 'Admin - Login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
