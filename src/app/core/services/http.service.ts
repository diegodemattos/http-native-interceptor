import { Observable } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpOptions } from '../data/interfaces/http.interface';

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options?: IHttpOptions): Observable<HttpEvent<T> | T> {
    return this.httpClient.get<T>(url, options);
  }

  post<T>(
    url: string,
    body: any,
    options?: IHttpOptions
  ): Observable<HttpEvent<T> | T> {
    return this.httpClient.post<T>(url, body, options);
  }

  patch<T>(
    url: string,
    body: any,
    options?: IHttpOptions
  ): Observable<HttpEvent<T> | T> {
    return this.httpClient.patch<T>(url, body, options);
  }

  put<T>(
    url: string,
    body: any,
    options?: IHttpOptions
  ): Observable<HttpEvent<T> | T> {
    return this.httpClient.put<T>(url, body, options);
  }

  delete<T>(url: string, options?: IHttpOptions): Observable<HttpEvent<T> | T> {
    return this.httpClient.delete<T>(url, options);
  }
}
