import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MenuService } from '../../services/menu.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { fadeIn, fadeOut } from 'src/app/shared/animations/fadeIn';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { RemoteOrdersFormComponent } from '../remote-orders-form/remote-orders-form.component';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'qd-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss', '../../menu.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class CartComponent implements OnInit {
  public playGame = false;

  constructor(
    public login_: LoginService,
    public menu_: MenuService,
    public cart_: CartService,
    private order_: OrderService,
    private dialog_: MatDialog,
    private game_: GameService,
  ) {}

  ngOnInit(): void {
    this.cart_.syncCart();
    this.login_.updateIsLogin();
    this.login_.updateSameOrigin();

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  public makeLocalOrder(table: string): void {
    this.order_.makeLocalOrder(this.cart_.cart, table);
  }

  public orderHomeDelivery(): void {
    this.login_.updateIsLogin();

    if (this.login_.isLogin()) {
      if (this.cart_.cart().length < 1) {
        this.dialog_.open(PopupComponent, { data: 'Your cart is empty!' });
      } else {
        this.dialog_.open(RemoteOrdersFormComponent, { data: this.cart_.cart });
      }
    } else {
      this.dialog_.open(LoginPopupComponent);
    }
  }

  public toggleGame() {
    this.playGame = !this.playGame;
    if (!this.playGame) this.game_.cancelGame();
  }
}
