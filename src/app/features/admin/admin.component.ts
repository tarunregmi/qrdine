import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'qd-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [ fadeIn ]
})
export class AdminComponent implements OnInit {
  constructor(
    public login_: LoginService
  ) {}

  ngOnInit(): void {
    this.login_.validateAdmin();
  }
}
