import { Injectable, WritableSignal } from '@angular/core';
import { MenuItem } from '../models/menu.model';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { tap } from 'rxjs';

interface item {
  id: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly key: string = 'myOrder';

  constructor(private login_: LoginService, private httpClient_: HttpClient) {}

  public makeLocalOrder(cart: WritableSignal<MenuItem[]>, table: string): boolean {
    this.login_.updateIsLogin();
    this.login_.updateSameOrigin();
    
    const items: item[] = [];
    cart().forEach(entry => items.push({id: entry.id, quantity: <number>entry.quantity}));
    
    let order;

    if (this.login_.sameOrigin()) {
      if (table) {
        if (this.login_.isLogin()) order = {items, table, username: JSON.parse(<string>localStorage.getItem('user')).id};
        else order = {items, table};

        this.httpClient_.post(`${environment.baseURL}/api/collections/orders/records`, order)
        .pipe(
          tap(response => console.log(response))
        ).subscribe();
      }
      else return false;
      return true;
    } else {
      console.log('You bave to be in H/R local network to make this order.')
      return false;
    }
  }
}
