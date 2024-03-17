import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { MenuService } from './services/menu.service';
import { RealtimeService } from 'src/app/shared/services/realtime.service';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'qd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  public items!: MenuItem[];

  constructor(private menu_: MenuService, private activatedRoute_: ActivatedRoute,private realtime_: RealtimeService) {}
  
  ngOnInit(): void {
    // this.activatedRoute_.data.subscribe({
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   next: (response: any) => this.items = response.items,
    //   error: (error) => console.log(error) 
    // });
    this.items = this.activatedRoute_.snapshot.data['items']

    console.log(this.items);

    this.realtime_.record('menu').subscribe('*', data => {
      switch(data.action) {
        case 'create': {
          this.items.unshift(this.item(data.record));
          break;
        }
        case 'update': {
          this.items.forEach((item, index) => {
            if (item.id === data.record.id) this.items[index] = this.item(data.record)
          });
          break;
        }
        case 'delete': {
          this.items.forEach((item, index) => {
            if (item.id === data.record.id) this.items.splice(index, 1);
          })
          break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.realtime_.unsubscribe('menu');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private item(data: any): MenuItem {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      veg: data.veg,
      price: data.price,
      thumbnail: `${environment.baseURL}/api/files/${data.collectionId}/${data.id}/${data.thumbnail}`,
    }
  }
}
