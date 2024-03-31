import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { MenuService } from './services/menu.service';
import { RealtimeService } from 'src/app/shared/services/realtime.service';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { TableService } from 'src/app/shared/services/table.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'qd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ fadeIn ]
})
export class MenuComponent implements OnInit, OnDestroy {
  public searchedKeyword!: string;
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;
  private scannedTable!: string | null;

  constructor(
    public cart_: CartService,
    public menu_: MenuService,
    private router_: Router,
    private realtime_: RealtimeService,
    private location_: Location,
    private route_: ActivatedRoute,
    private table_: TableService,
    private login_: LoginService,
  ) {}
  
  ngOnInit(): void {
    this.cart_.syncCart();

    this.realtime_.record('menu').subscribe('*', data => {
      switch(data.action) {
        case 'create': {
          this.menu_.menuItems().unshift(this.item(data.record));
          this.menu_.menuItems().pop();
          this.menu_.totalItems.update(current => current + 1);
          break;
        }
        case 'update': {
          this.menu_.menuItems().forEach((item, index) => {
            if (item.id === data.record.id) this.menu_.menuItems()[index] = this.item(data.record)
          });
          break;
        }
        case 'delete': {
          this.menu_.menuItems().forEach((item, index) => {
            if (item.id === data.record.id) this.menu_.menuItems().splice(index, 1);
          })
          this.menu_.totalItems.update(current => current - 1);
          break;
        }
      }
    });

    this.searchSubject.pipe(debounceTime(500)).subscribe(searchValue => {
      this.searchSubscription?.unsubscribe();
      this.searchSubscription = this.menu_.getItems(`(title~'${searchValue}')`).subscribe();
    });

    // book table if user visit menu by scanning qr
    this.scannedTable = this.route_.snapshot.queryParamMap.get('table');
    if (this.scannedTable) {
      this.login_.updateAccessCredential();
      if (this.login_.sameOrigin()) {
        localStorage.setItem('bookedTable', this.scannedTable);
        this.table_.bookTable(this.scannedTable);
      }
    }
  }

  public mpt(event: PageEvent) {
    if (<number>event.previousPageIndex > event.pageIndex) this.location_.back();
    else this.router_.navigate(['./', { page: event.pageIndex + 1 }], { queryParamsHandling: 'preserve' });
    window.scrollTo({top: 0});
  }

  public search(): void {
    this.searchSubject.next(this.searchedKeyword.trim());
  }

  ngOnDestroy(): void {
    this.realtime_.unsubscribe('menu');
    this.searchSubject.unsubscribe();
    this.searchSubscription?.unsubscribe();
    if (this.scannedTable) localStorage.removeItem('bookedTable');
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
