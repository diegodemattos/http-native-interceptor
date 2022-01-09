import { StorageService } from './storage.service';
import { Token } from './../data/interfaces/auth.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, timer, Observable, Subject } from 'rxjs';
import { exhaustMap, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class RefreshTokenService {
  token$: BehaviorSubject<Token>;
  requestToken$: Subject<string>;

  constructor(private storageService: StorageService) {
    this.token$ = new BehaviorSubject({
      token: null,
      expiration: null,
    });
    this.requestToken$ = new Subject();
    this.requestToken$
      .pipe(
        filter(
          (expiredToken: string) =>
            !this.isValidToken(this.token$.value, expiredToken)
        ),
        exhaustMap(() => this.requestNewToken())
      )
      .subscribe(
        (token: Token) => {
          this.storageService.set('token', token.token);
          this.token$.next(token);
        },
        (error) => {
          this.token$.error(error);
        }
      );
  }

  getToken(expiredToken: string) {
    this.requestToken$.next(expiredToken);
    return this.token$.pipe(
      filter((token) => this.isValidToken(token, expiredToken)),
      take(1)
    );
  }

  private requestNewToken(): Observable<Token> {
    return timer(5000).pipe(
      switchMap(() =>
        of({
          token: String(Math.ceil(Math.random() * 99999)).padStart(5, '0'),
          expiration: Math.ceil(Math.random() * 99999999999),
        })
      )
    );
  }

  private isValidToken(token: Token, expiredToken: string): boolean {
    return token.expiration !== null && token.token !== expiredToken;
  }
}
