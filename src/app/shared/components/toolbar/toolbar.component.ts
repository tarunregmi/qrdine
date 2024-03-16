import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'qd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public login_: LoginService) {}
}
