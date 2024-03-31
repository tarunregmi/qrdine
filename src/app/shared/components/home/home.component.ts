import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'qd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public showMyOrders = false;

  constructor(
    private login_: LoginService,
  ) {}

  ngOnInit(): void {
    this.login_.updateAccessCredential();

    if (
      localStorage.getItem('myUnRegisteredOrders') ||
      this.login_.isLogin() ||
      this.login_.sameOrigin()
    ) this.showMyOrders = true;
    else this.showMyOrders = false;
  }
}
