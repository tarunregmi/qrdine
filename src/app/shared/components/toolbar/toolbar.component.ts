import { Component, HostListener } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'qd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public isScrolled = false;

  constructor(public login_: LoginService) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset;
    this.isScrolled = scrollPosition > 0;
  }
}
