import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { LoginService } from 'src/app/shared/services/login.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'qd-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [ fadeIn ]
})
export class MyOrdersComponent implements OnInit {
  public orderType = 'local';
  public isAccessible!: boolean;
  public readonly href = `http://${environment.baseURL.split(":")[1].split('//')[1]}:4200`;

  constructor(
    public login_: LoginService,
  ) {}

  ngOnInit(): void {
    this.login_.updateAccessCredential();

    if (this.login_.isLogin() || this.login_.sameOrigin()) {
      this.isAccessible = true;
    } else {
      this.isAccessible = false;
    }
  }
}
