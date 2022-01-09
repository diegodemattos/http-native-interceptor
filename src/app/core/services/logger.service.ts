import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  constructor() {}

  log(...args: any[]) {
    args.forEach((arg: any) => console.log(arg));
  }

  error(...args: any[]) {
    args.forEach((arg: any) => console.error(arg));
  }

  warning(...args: any[]) {
    args.forEach((arg: any) => console.warn(arg));
  }
}
