import { HttpNativeService } from './../services/http-native.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { PlatformService } from '../services/platform.service';

@Injectable()
export class NativeRequestInterceptor<T> implements HttpInterceptor {
  constructor(
    private platformService: PlatformService,
    private httpNativeService: HttpNativeService
  ) {}

  public intercept(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    if (this.platformService.isMobile()) {
      return this.httpNativeService.handle(request);
    }
    return next.handle(request);
  }
}
