import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MenuItem } from 'src/app/shared/models/menu.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient_: HttpClient) {}

  public getItems(): Observable<MenuItem[]> {
    return this.httpClient_.get(`${environment.baseURL}/api/collections/menu/records?sort=-updated,title`)
    .pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((response: any) => {
        const items: MenuItem[] = [];

        response?.items?.forEach((item: MenuItem) => items.push({
          id: item.id,
          title: item.title,
          description: item.description,
          veg: item.veg,
          price: item.price,
          thumbnail: `${environment.baseURL}/api/files/${item.collectionId}/${item.id}/${item.thumbnail}`
        }));

        return items;
      })
    );
  }

  public getItem(id: string): Observable<MenuItem> {
    return this.httpClient_.get(`${environment.baseURL}/api/collections/menu/${id}`)
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((response: any) => {
          return {
            id: response.id,
            title: response.title,
            description: response.description,
            veg: response.veg,
            price: response.price,
            thumbnail: `${environment.baseURL}/api/files/${response.collectionId}/${response.id}/${response.thumbnail}`
          }
        })
      )
  }
}
