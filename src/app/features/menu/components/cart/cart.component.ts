import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'qd-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss', '../../menu.component.scss'],
})
export class CartComponent implements OnInit {
  public table!: string;
  constructor(public menu_: MenuService, public cart_: CartService) {}
  
  ngOnInit(): void {
    this.cart_.syncCart();
  }

  public change(): void {
    console.log(this.table);
  }
}
