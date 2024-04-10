import { Component } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/fadeIn';

@Component({
  selector: 'qd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ fadeIn ],
})
export class DashboardComponent {

}
