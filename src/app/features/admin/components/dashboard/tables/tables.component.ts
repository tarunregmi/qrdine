import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/fadeIn';
import { TableService } from 'src/app/shared/services/table.service';

@Component({
  selector: 'qd-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['../dashboard.component.scss'],
  animations: [ fadeIn ]
})
export class TablesComponent implements OnInit, OnDestroy {
  constructor(
    public table_: TableService,
  ) {}

  ngOnInit(): void {
    this.table_.subscribeRealtime();
  }

  ngOnDestroy(): void {
    this.table_.unsubscribeRealtime();
  }
}
