import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((module) => module.AuthModule) },
  { path: '', component: HomeComponent, title: 'Home' },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
