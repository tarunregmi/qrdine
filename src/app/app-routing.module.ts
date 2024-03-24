import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((module) => module.AuthModule) },
  { path: 'menu', loadChildren: () => import('./features/menu/menu.module').then(module => module.MenuModule) },
  { path: 'my-orders', loadChildren: () => import('./features/my-orders/my-orders.module').then(m => m.MyOrdersModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: '', component: HomeComponent, title: 'Home' },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
