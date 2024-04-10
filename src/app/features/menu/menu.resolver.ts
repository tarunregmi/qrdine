import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MenuService } from './services/menu.service';
import { EMPTY, Observable, catchError, concatMap, of } from 'rxjs';
import { MenuItem } from 'src/app/shared/models/menu.model';

export const menuResolver: ResolveFn<Observable<MenuItem[]>> = (route) => {
  const menu_ = inject(MenuService);

  menu_.pageIndex.set(Number(route.paramMap.get('page')));

  return menu_.getItems().pipe(
    catchError(() => EMPTY),
    concatMap(response => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (response) return of(response);
      else return EMPTY;
    })
  );

};
