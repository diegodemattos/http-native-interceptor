import { StorageService } from './services/storage.service';
import { LoggerService } from './services/logger.service';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { HttpNativeService } from './services/http-native.service';
import { HttpService } from './services/http.service';
import { NgModule, Provider } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.intercetor';
import { NativeRequestInterceptor } from './interceptors/native-request.interceptor';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { PlatformService } from './services/platform.service';
import { RefreshTokenService } from './services/refresh-token.service';

const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RefreshTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NativeRequestInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [HttpClientModule],
  providers: [
    HttpService,
    HttpNativeService,
    PlatformService,
    RefreshTokenService,
    LoggerService,
    StorageService,
    HTTP,
    ...interceptors,
  ],
})
export class CoreModule {}
