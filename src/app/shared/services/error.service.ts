import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError , Observable, of} from 'rxjs';
@Injectable()

export class ErrorService {
  ErrorMessage: any = "";
  constructor() { }

  public handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status == 404)
      return;

    if (error.status == 401 && error.statusText == 'Unauthorized')
      return throwError("Please Login Again");


    if (error.error instanceof ErrorEvent) {      
      this.ErrorMessage = (error.error as ErrorEvent).message;
    } else {
      this.ErrorMessage = (error.error) ? ((!error.error.server_error) ? error.error : error.error.server_error) : error;
    }

    return throwError((this.ErrorMessage instanceof Array) ? this.ErrorMessage[0] : this.ErrorMessage);
  };

}
