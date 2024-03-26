import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { QueryParams } from 'src/app/shared/models/queryparams.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menuItems = signal<MenuItem[]>([]);
  public totalItems = signal<number>(0);
  public pageIndex = signal<number>(0);
  public pageSize = signal<number>(6);

  constructor(private httpClient_: HttpClient) {}

  public getItems(filter?: string): Observable<MenuItem[]> {
    const queryParameters: QueryParams = { page: 1, perPage: this.pageSize(), sort: '-updated,title' }
    if (this.pageIndex()) queryParameters.page = this.pageIndex();
    if (filter) queryParameters.filter = filter;

    return this.httpClient_.get(`${environment.baseURL}/api/collections/menu/records`, { params: <HttpParams>queryParameters })
    .pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((response: any) => {
        const items: MenuItem[] = [];
        this.totalItems.set(response?.totalItems);
        response?.items?.forEach((entry: MenuItem) => items.push(this.item(entry)));
        this.menuItems.set(items);
        return this.menuItems();
      })
    );
  }

  public getItem(id: string): Observable<MenuItem> {
    return this.httpClient_.get(`${environment.baseURL}/api/collections/menu/records/${id}`)
    .pipe(map(response => this.item(response)))
  }

  public addItem(item: unknown): Observable<MenuItem> {
    return this.httpClient_.post<MenuItem>(`${environment.baseURL}/api/collections/menu/records`, item);
  }

  public editItem(id: string, item: unknown): Observable<MenuItem> {
    return this.httpClient_.patch<MenuItem>(`${environment.baseURL}/api/collections/menu/records/${id}`, item);
  }

  public deleteItem(id: string): Observable<MenuItem> {
    return this.httpClient_.delete<MenuItem>(`${environment.baseURL}/api/collections/menu/records/${id}`);
  }
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private item(data: any) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      veg: data.veg,
      price: data.price,
      thumbnail: `${environment.baseURL}/api/files/${data.collectionId}/${data.id}/${data.thumbnail}`
    }
  }
}
