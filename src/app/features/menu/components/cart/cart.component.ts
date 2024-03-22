import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MenuService } from '../../services/menu.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'qd-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss', '../../menu.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public login_: LoginService, public menu_: MenuService, public cart_: CartService, private order_: OrderService, private dialog_: MatDialog) {}

  ngOnInit(): void {
    this.cart_.syncCart();
    this.login_.updateIsLogin();
    this.login_.updateSameOrigin();

    window.scrollTo({ top: 0, behavior: 'instant'});
  }

  public makeLocalOrder(table: string): void {
    this.order_.makeLocalOrder(this.cart_.cart, table);
    this.cart_.cart.set([]);
  }

  public orderHomeDelivery(): void {
    this.cart_.syncCart();
    this.login_.updateIsLogin();

    if (this.login_.isLogin()) {
      console.log('Home delivery')
    } else {
      this.dialog_.open(LoginPopupComponent);
    }
  }
}
