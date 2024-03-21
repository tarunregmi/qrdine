import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { TableModel } from 'src/app/shared/models/table.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { RealtimeService } from 'src/app/shared/services/realtime.service';
import { environment } from 'src/environments/environment.development';
import { OriginPopupComponent } from '../origin-popup/origin-popup.component';
import { PopupComponent } from '../popup/popup.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'qd-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Output() localOrder = new EventEmitter<string>();

  public bookedTable!: string;
  public selectedTable!: string;
  public tables: TableModel[] = [];

  private readonly collection: string = "tables";

  constructor(
    private login_: LoginService,
    private httpClient_: HttpClient,
    private realtime_: RealtimeService,
    private dialog_: MatDialog,
    private route_: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.bookedTable = <string>this.route_.snapshot.queryParamMap.get('table');

    if (this.bookedTable) {
      // user access by scanning the qr
      // un-book previous scanned table (if it is)
      if (this.getBookedTable()) this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.getBookedTable()}`, { isAvailable: true }).subscribe();

      // book new table
      this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.bookedTable}`, { isAvailable: false }).subscribe();
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
      
      console.log(this.bookedTable);
    }

    // if (this.bookedTable) {
    //   // un-book previous scanned table (if it is)
    //   if (this.getBookedTable()) {
    //     if (this.getBookedTable() !== this.bookedTable) {
    //       this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.getBookedTable()}`, { isAvailable: true }).subscribe();
    //       this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.bookedTable}`, { isAvailable: false }).subscribe();
    //     }
    //   } else {
    //     this.httpClient_.patch(`${environment.baseURL}/api/collections/${this.collection}/records/${this.bookedTable}`, { isAvailable: false }).subscribe();
    //   }
      
    //   localStorage.setItem('bookedTable', this.bookedTable);
    //   this.selectedTable = this.bookedTable;
    // } else {
    //   this.bookedTable = this.getBookedTable();
    //   this.selectedTable = this.getBookedTable();
    // }

    this.httpClient_.get(`${environment.baseURL}/api/collections/${this.collection}/records`)
    .pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((response: any) => {
        this.tables = response.items.map((item: unknown) => this.table(item));
      })
    ).subscribe();

    this.realtime_.record(this.collection).subscribe('*', data => {
      switch(data.action) {
        case 'create': {
          this.tables.push(this.table(data.record));
          break;
        }
        case 'update': {
          this.tables.forEach((table, index) => {
            if (table.id === data.record.id) this.tables[index] = this.table(data.record)
          });
          break;
        }
        case 'delete': {
          this.tables.forEach((table, index) => {
            if (table.id === data.record.id) this.tables.splice(index, 1);
          })
          break;
        }
      }
    });
  }

  public changeTable(table: NgForm): void {
    this.login_.updateSameOrigin();

    if (this.login_.sameOrigin()) {
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
        // console.log('Successful local order.');
        this.localOrder.emit(this.bookedTable);
        // console.log(this.bookedTable);
      } else {
        this.dialog_.open(PopupComponent, { data: 'Book your table first.' });
      }
    } else {
      this.dialog_.open(OriginPopupComponent);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private table(data: any): TableModel{
    return {
      id: data.id,
      name: data.name,
      isAvailable: data.isAvailable
    }
  }

  private getBookedTable(): string {
    return <string>localStorage.getItem('bookedTable');
  }

  ngOnDestroy(): void {
    this.realtime_.unsubscribe(this.collection);
  }
}
