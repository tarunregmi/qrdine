import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { menuResolver } from './menu.resolver';

const routes: Routes = [
  { path: '', component: MenuComponent, title: 'Menu', resolve: {items: menuResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
