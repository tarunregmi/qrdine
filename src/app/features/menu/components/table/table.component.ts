import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services/login.service';
import { environment } from 'src/environments/environment.development';
import { OriginPopupComponent } from '../origin-popup/origin-popup.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'qd-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [ fadeIn ]
})
export class TableComponent implements OnInit, OnDestroy {
  @Output() public playGame = new EventEmitter();
  @Output() public localOrder = new EventEmitter<string>();

  public bookedTable!: string;
  public selectedTable!: string;

  private readonly collection: string = "tables";

  constructor(
    public table_: TableService,
    private login_: LoginService,
    private httpClient_: HttpClient,
    private dialog_: MatDialog,
    private route_: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.login_.updateAccessCredential();
    
    if (this.login_.sameOrigin()) {
      this.bookedTable = <string>this.route_.snapshot.queryParamMap.get('table');

      if (this.bookedTable) {
        // user access by scanning the qr
        // un-book previous scanned table (if it is)
        if (this.getBookedTable()) this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.getBookedTable()}`, { isAvailable: true }).subscribe();

        if (this.isCartNotEmpty()) {
          // book new table
          localStorage.setItem('bookedTable', this.bookedTable);
          this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.bookedTable}`, { isAvailable: false }).subscribe();
        } else {
          this.bookedTable = '';
        }
      } else {
        // user manually access the website
        // get previously booked table (if it is)
        this.bookedTable = this.getBookedTable();
        
        // un-book previous booked table (if it is)
        if (this.bookedTable) {
          this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.bookedTable}`, { isAvailable: true }).subscribe();
          localStorage.removeItem('bookedTable');
          this.bookedTable = this.getBookedTable();
        }
      }
    }

    this.table_.subscribeRealtime();
  }

  public changeTable(table: NgForm): void {
    this.login_.updateSameOrigin();

    if (this.login_.sameOrigin()) {
      if (this.isCartNotEmpty()) {
        if(this.route_.snapshot.queryParamMap.get('table')) {
          // if user scann qr code
          this.dialog_.open(PopupComponent, { data: 'You are not allowed to change the table because you have scanned the table\'s QR. To change the table, scan the QR of the table you want.' });
          setTimeout(() => this.selectedTable = this.getBookedTable(), 10);
        } else {
          this.bookedTable = this.getBookedTable();
  
          // un-book previous table (if it is booked)
          if (this.bookedTable) this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.bookedTable}`, { isAvailable: true }).subscribe();
          localStorage.setItem('bookedTable', this.selectedTable);
  
          // book new selected table
          this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.selectedTable}`, { isAvailable: false }).subscribe();
          this.bookedTable = this.selectedTable;
        }
      } else {
        this.dialog_.open(PopupComponent, { data: 'Your cart is empty!' });
        table.reset();
      }
    } else {
      this.dialog_.open(OriginPopupComponent);
      table.reset();
    }
  }

  public orderLocally() {
    this.login_.updateIsLogin();
    this.login_.updateSameOrigin();
    this.bookedTable = this.getBookedTable();
    
    if (this.login_.sameOrigin()) {
      if (this.bookedTable) {
        if (this.isCartNotEmpty()) {
          this.localOrder.emit(this.bookedTable);
        } else {
          this.dialog_.open(PopupComponent, { data: 'Your cart is empty!' });
          this.bookedTable = '';
        }
      } else {
        this.dialog_.open(PopupComponent, { data: 'Book your table first.' });
      }
    } else {
      this.dialog_.open(OriginPopupComponent);
    }
  }

  private getBookedTable(): string {
    return <string>localStorage.getItem('bookedTable');
  }

  ngOnDestroy(): void {
    this.table_.unsubscribeRealtime();
  }

  private isCartNotEmpty(): boolean {
    return <number>localStorage.getItem('cart')?.length > 2; // cart = [] || cart = null
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    if (localStorage.getItem('bookedTable')) {
      event.preventDefault();
    }
  }
}
