import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'qd-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss', '../item/item.component.scss']
})
export class CartItemComponent {
  @Input() public id!: string;
  @Input() public cart_!: CartService;
  @Input() public item!: MenuItem;
}
