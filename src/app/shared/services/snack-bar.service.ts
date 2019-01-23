import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable()
export class SnackBarService {

  snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
  constructor(public snackBar: MatSnackBar, @Inject(LOCALE_ID) private localeId: string) {
    this.snackBarConfig.horizontalPosition = 'center';
    this.snackBarConfig.duration = 6000;
    this.snackBarConfig.panelClass = "snackBar"

  }

  success(message: any, param?: any, action: string = '') {
    message = this.getMessage(message, param);
    this.snackBarConfig.panelClass = 'snack_success';
    this.snackBarConfig.verticalPosition = 'top';

    this.snackBar.open(message, action, this.snackBarConfig);
  }

  warn(message: any, param?: any, action: string = '') {
    message = this.getMessage(message, param);

    this.snackBarConfig.panelClass = 'snack_warn';
    this.snackBarConfig.verticalPosition = 'top';

    this.snackBar.open(message, action, this.snackBarConfig);
  }

  error(message: any, param?: any, action: string = '') {
    message = this.getMessage(message, param);
    this.snackBarConfig.panelClass = 'snack_error';
    this.snackBarConfig.verticalPosition = 'top';

    this.snackBar.open(message, action, this.snackBarConfig);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  getMessage(message: any, param?: any): string {
    return message += param ? ' : ' + param : '';
  }

}


