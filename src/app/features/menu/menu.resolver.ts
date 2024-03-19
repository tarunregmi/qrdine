import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MenuService } from './services/menu.service';
import { EMPTY, Observable, catchError, concatMap, of } from 'rxjs';
import { MenuItem } from 'src/app/shared/models/menu.model';

export const menuResolver: ResolveFn<Observable<MenuItem[]>> = () => {
  const menu_ = inject(MenuService);

  return menu_.getItems().pipe(
    catchError(() => EMPTY),
    concatMap(response => {
      if (response) return of(response);
      else return EMPTY;
    })
  );

};
