import { Pipe, PipeTransform } from '@angular/core';
//import { MomentService } from '../../services/moment.service';

@Pipe({ name: 'showData' })
export class ShowDataPipe implements PipeTransform {
  constructor() {

  }

  transform(value: string, param: string): string {
    if (value === null || value === undefined ||  value === "undefined")
      return '';

    if (param == 'MoneyFormat')
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    // if (param == 'MonthName')
    //   return this._moment.getMonthNameBaseLocale(value);

    // if (param == 'DayNumber')
    //   return this._moment.getDayNumberInMonthBaseLocale(value);

    // if (param == 'DayName')
    //   return this._moment.getDayNameBaseLocale(value);

    if (value === 'true') {
      return '<i class="material-icons" color="primary">check_circle</i>';
    }
    if (value === 'false') {
      return '<i class="material-icons" color="disabled">cancel</i>';
    }
    return value;
  }
}
