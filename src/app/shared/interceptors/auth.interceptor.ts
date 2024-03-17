import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loader_: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader_.isLoading.set(true);

    const token = localStorage.getItem('loginToken');

    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: String(token)
      }
    });
    
    return next.handle(clonedRequest).pipe(
      finalize(() => this.loader_.isLoading.set(false))
    )
  }
}
