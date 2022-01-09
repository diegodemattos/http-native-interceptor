import { LoggerService } from './logger.service';
import {
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HTTP,
  HTTPResponse as HTTPNativeResponse,
} from '@awesome-cordova-plugins/http/ngx';
import { Observable, Subscriber } from 'rxjs';
import { HttpMethod, Serializer } from '../data/types/http-native.type';
import { PlatformService } from './platform.service';
import { HOSTS } from '../data/constants/hosts.constant';

@Injectable()
export class HttpNativeService {
  constructor(
    private httpNative: HTTP,
    private loggerService: LoggerService,
    private platformService: PlatformService
  ) {}

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const hostname: string = request.url.split('/')[0];
    const url: string = request.url.replace(hostname, HOSTS[hostname].name);
    const headers: { [name: string]: string } = request.headers.keys().reduce(
      (headers: { [name: string]: string }, key: string) => ({
        ...headers,
        [key]: request.headers.get(key),
      }),
      {}
    );
    const method: HttpMethod = request.method.toLowerCase() as HttpMethod;
    const data: any = request.body ? request.body : {};
    const contentType: string = request.headers.get('content-type')
      ? request.headers.get('content-type')
      : 'application/json';
    const serializer: Serializer = this.getSerializer(contentType);
    return new Observable((subscriber: Subscriber<HttpResponse<any>>) => {
      this.httpNative
        .sendRequest(url, {
          method,
          data,
          headers,
          serializer,
        })
        .then((httpNativeResponse: HTTPNativeResponse) => {
          const httpResponse: HttpResponse<any> = new HttpResponse({
            body:
              serializer === 'json'
                ? this.parseJSON(httpNativeResponse.data)
                : httpNativeResponse.data,
            status: httpNativeResponse.status,
            headers: new HttpHeaders(httpNativeResponse.headers),
            url: httpNativeResponse.url,
          });
          subscriber.next(httpResponse);
          subscriber.complete();
        })
        .catch((error) => {
          const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({
            ...error,
            error: this.parseJSON(error.error),
          });
          subscriber.error(httpErrorResponse);
        });
    });
  }

  private getSerializer(contentType: string): Serializer {
    return {
      'application/x-www-form-urlencoded': 'utf8',
      'application/json': 'json',
      'plain/text': 'utf8',
      'multipart/form-data': 'multipart',
      'application/octet-stream': 'raw',
    }[contentType] as Serializer;
  }

  private parseJSON(content: string): any {
    try {
      return typeof content === 'string' ? JSON.parse(content) : content;
    } catch (err) {
      this.loggerService.error('ERROR PARSING RESPONSE DATA', content, err);
      return content;
    }
  }
}
