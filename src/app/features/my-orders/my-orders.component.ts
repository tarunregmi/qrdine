import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { LoginService } from 'src/app/shared/services/login.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'qd-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [ fadeIn ]
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  public isAccessible!: boolean;
  public readonly href = `http://${environment.baseURL.split(":")[1].split('//')[1]}:4200`;

  constructor(
    public order_: OrderService,
    private login_: LoginService,
  ) {}

  ngOnInit(): void {
    this.login_.updateAccessCredential();

    if (this.login_.isLogin() || this.login_.sameOrigin()) {
      this.isAccessible = true;
      this.order_.syncMyOrdersState();
    } else {
      this.isAccessible = false;
    }
  }

  ngOnDestroy(): void {
    this.order_.unSubscribeRealtime();
  }
}
