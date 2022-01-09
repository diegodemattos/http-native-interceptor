import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {}

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.parse(value));
  }

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }
}
