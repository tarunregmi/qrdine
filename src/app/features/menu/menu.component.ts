import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'qd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public items!: MenuItem[];

  constructor(private menu_: MenuService) {}

  ngOnInit(): void {
    this.menu_.getItems().subscribe(data => {
      this.items = data;
      console.log(this.items)
    });
  }
}
