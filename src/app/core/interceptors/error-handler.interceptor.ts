import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ERROR_MESSAGES } from '../data/constants/error-messages.constant';
import { HttpError } from '../data/models/http-error.model';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const code: number = error.error.code ? error.error.code : error.status;
        const message: string = error.error.message
          ? error.error.message
          : this.getErrorMessageFromStatus(code);
        return throwError(new HttpError(code, message, error));
      })
    );
  }

  private getErrorMessageFromStatus(status: number): string {
    return ERROR_MESSAGES[status]
      ? ERROR_MESSAGES[status]
      : ERROR_MESSAGES[500];
  }
}
