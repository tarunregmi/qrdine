import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'qd-origin-popup',
  templateUrl: './origin-popup.component.html',
  styleUrls: ['./origin-popup.component.scss']
})
export class OriginPopupComponent {
  public readonly href = `http://${environment.baseURL.split(":")[1].split('//')[1]}:4200`;
}
