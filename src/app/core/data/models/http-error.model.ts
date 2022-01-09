import { HttpErrorResponse } from '@angular/common/http';

export class HttpError {
  constructor(
    public code: number,
    public message: string,
    public error: HttpErrorResponse
  ) {}
}
