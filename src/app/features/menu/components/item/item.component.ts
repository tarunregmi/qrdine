import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'qd-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item!: MenuItem;
  @Input() cart_!: CartService;

  public lable!: string;

  ngOnInit(): void {
    this.updateLable()
  }

  public addToCart() {
    this.cart_.updateCart(this.item);
    this.updateLable();
  }

  private updateLable() {
    if (this.cart_.cart().some(entry => entry.id === this.item.id)) this.lable = "Remove from Cart";
    else this.lable = 'Add to Cart';
  }
}
