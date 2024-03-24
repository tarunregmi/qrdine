import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: '', component: AdminComponent, title: 'Admin' },
  { path: 'login', component: AuthComponent, title: 'Admin - Login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
