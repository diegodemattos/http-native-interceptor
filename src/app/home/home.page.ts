import { HttpService } from './../core/services/http.service';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private httpService: HttpService) {}

  doSimpleGet(repeat: number = 1) {
    for (let i = 0; i <= repeat - 1; i++) {
      this.httpService.get<any>('main/whitelist').subscribe(
        (response: any) => {
          console.log('RESPONSE ' + i, response);
        },
        (error: HttpErrorResponse) => {
          console.log('ERROR ' + i, error);
        }
      );
    }
  }

  doSimpleGetWithError(repeat: number = 1) {
    for (let i = 0; i <= repeat - 1; i++) {
      this.httpService.post<any>('main/jwt', {}).subscribe(
        (response: any) => {
          console.log('RESPONSE ' + i, response);
        },
        (error: HttpErrorResponse) => {
          console.log('ERROR ' + i, error);
        }
      );
    }
  }

  doSimpleGetWithRefreshError(repeat: number = 1) {
    for (let i = 0; i <= repeat - 1; i++) {
      this.httpService.post<any>('main/auth', {}).subscribe(
        (response: any) => {
          console.log('RESPONSE ' + i, response);
        },
        (error: HttpErrorResponse) => {
          console.log('ERROR ' + i, error);
        }
      );
    }
  }
}
