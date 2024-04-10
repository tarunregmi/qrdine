import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly key: string = 'cart';
  public cart = signal<MenuItem[]>([]);


  /**
   * @param id Item id in database
   * @param quantity Quantity of that item `default = 1`
   * @description
   * - add item to cart if that item is not in cart
   * - remove item form cart if already in cart
   */
  public updateCart(item: MenuItem, quantity?: (-1 | 1)): void {
    const index = this.cart().findIndex(entry => entry.id == item.id);
    
    if (item && quantity) {
      // update quantity only
      this.cart()[index]['quantity'] = <number>this.cart()[index].quantity + quantity;
    } else {
      if (index > -1) {
        // remove item and it quantity
        this.cart().splice(index, 1);
      } else {
        // add item and it quantity
        this.cart.update((state) => [{...item, quantity: 1}, ...state])
      }
    }

    localStorage.setItem(this.key, JSON.stringify(this.cart()));
  }


  /**
   * @description synchronize `cartItems`&lt;signal&gt; with localStorage
   */
  public syncCart() {
    const data = JSON.parse(<string>localStorage.getItem(this.key));
    if (data) this.cart.set(data);
  }

  public getQuantityOf(item: MenuItem): number {
    return <number>this.cart()[this.cart().findIndex(entry => entry.id == item.id)].quantity;
  }
}
