import { Injectable } from '@angular/core';
import { TableModel } from '../models/table.model';
import { RealtimeService } from './realtime.service';
import { RecordModel } from 'pocketbase';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  public readonly collection: string = 'tables';
  public tables: TableModel[] = [];

  private url = `${environment.baseURL}/api/collections/${this.collection}/records`;

  constructor(
    private realtime_: RealtimeService,
    private httpClient_: HttpClient,
  ) {}

  public updateTable(id: string, isAvailable: boolean) {
    this.httpClient_.patch(`${this.url}/${id}`, { isAvailable }).subscribe();
  }

  public bookTable(id: string) {
    this.httpClient_.patch(`${this.url}/${id}`, { isAvailable: false }).subscribe();
  }

  public subscribeRealtime(): void {
    this.getAllTables();

    this.realtime_.record(this.collection).subscribe('*', data => {
      switch (data.action) {
        case 'create': {
          this.tables.push(this.table(data.record));
          break;
        }
        case 'update': {
          const updatedItemIndex = this.findTableIndex(data.record.id);
          if (updatedItemIndex > -1) this.tables[updatedItemIndex] = this.table(data.record);
          break;
        }
        case 'delete': {
          const deletedItemIndex = this.findTableIndex(data.record.id);
          if (deletedItemIndex > -1) this.tables.splice(deletedItemIndex, 1);
          break;
        }
      }
    })
  }

  public unsubscribeRealtime(): void {
    this.tables.length = 0;
    this.realtime_.unsubscribe(this.collection);
  }

  /**
   * @description Get all table from database and put them in `tables: TableModel[]`
   */
  private getAllTables(): void {
    this.httpClient_.get(`${environment.baseURL}/api/collections/${this.collection}/records`)
    .pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tap((response: any) => {
        this.tables = response.items.map((item: RecordModel) => this.table(item));
      })
    ).subscribe();
  }

  /**
   * @description Extract necessary table information
   */
  private table(data: RecordModel): TableModel {
    return {
      id: data.id,
      name: data['name'],
      isAvailable: data['isAvailable'],
    }
  }

  private findTableIndex(id: string): number {
    return this.tables.findIndex(table => table.id === id);
  }
}
