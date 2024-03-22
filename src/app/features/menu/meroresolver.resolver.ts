import { ResolveFn } from '@angular/router';

export const meroresolverResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
