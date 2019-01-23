import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { User, ClassRoom } from '../../models';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any>{
  constructor(private _crudService: CrudService ) {
  
   }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this._crudService.getUserByRole(route.data.roleType)
      .pipe(catchError(err => { return of([]); }))
  }
}
