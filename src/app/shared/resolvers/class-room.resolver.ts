import { Resolve } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { User, ClassRoom } from '../../models';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomResolver implements Resolve<any>{

  constructor(private _crudService: CrudService) { }

  resolve(): Observable<User[]> {
    return this._crudService.getClass()
      .pipe(catchError(err => { return of([]); }))
  }
}

