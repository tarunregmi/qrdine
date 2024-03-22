import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { menuResolver } from './menu.resolver';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: MenuComponent, title: 'Menu', resolve: {items: menuResolver} },
  { path: 'cart', component: CartComponent, title: 'Shopping Cart' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
