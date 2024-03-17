import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu.model';

@Component({
  selector: 'qd-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item!: MenuItem;
}
