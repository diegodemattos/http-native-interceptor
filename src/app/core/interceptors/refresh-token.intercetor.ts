import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { HttpError } from '../data/models/http-error.model';
import { RefreshTokenService } from '../services/refresh-token.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private refreshTokenService: RefreshTokenService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpError) => {
        if (error.code === 401 && request.url.indexOf('gerarJwt') === -1) {
          const expiredToken: string = request.headers.get('jwt');
          return this.refreshTokenService.getToken(expiredToken).pipe(
            take(1),
            switchMap(({ token }) => {
              request = request.clone({
                setHeaders: { jwt: token },
              });
              return next.handle(request);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
