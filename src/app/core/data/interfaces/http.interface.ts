import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IHttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe: 'events';
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
