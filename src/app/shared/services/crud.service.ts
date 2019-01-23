import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { ConfigService } from './config.service';

import { ClassStudent, ClassRoom, User, Menu, RoleType } from '../../models';
import { Observable, of } from 'rxjs';

@Injectable()
export class CrudService {

  constructor(private _http: HttpClient
    , private _errorServ: ErrorService
    , private _configService: ConfigService) { }


  //-------------------------User API--------------------------------

  public getUserByRole(roleType: RoleType) {
    return this._http.get<User[]>(this._configService.getApiURI() + '/user/byrole/' + roleType)
      .pipe(catchError(this._errorServ.handleError));
  }

  insertUser(student: User) {
    return this._http.post<User>(this._configService.getApiURI() + '/user/register', student)
      .pipe(catchError(this._errorServ.handleError));
  }

  updateUser(student: User) {
    return this._http.put<User>(this._configService.getApiURI() + '/user/' + student.id, student)
      .pipe(catchError(this._errorServ.handleError));
  }

  deleteUser(id: number) {
    return this._http.delete<User>(this._configService.getApiURI() + '/user/' + id)
      .pipe(catchError(this._errorServ.handleError));
  }

  //-----------------------------------------------------------

  //-------------------------Class API--------------------------------


  getClass() {
    return this._http.get<ClassRoom[]>(this._configService.getApiURI() + '/class')
      .pipe(catchError(this._errorServ.handleError));
  }

  addClass(classRoom: ClassRoom) {
    return this._http.post<ClassRoom>(this._configService.getApiURI() + '/class/register', classRoom)
      .pipe(catchError(this._errorServ.handleError));
  }

  updateClass(classRoom: ClassRoom) {
    return this._http.put<ClassRoom>(this._configService.getApiURI() + '/class/' + classRoom.id, classRoom)
      .pipe(catchError(this._errorServ.handleError));
  }

  deleteClass(id: number) {

    return this._http.delete<ClassRoom>(this._configService.getApiURI() + '/class/' + id)
      .pipe(catchError(this._errorServ.handleError));
  }

  //------------------------- class Student------------------

  getStudentsInClass(classId: number) {
    return this._http.get<ClassStudent[]>(this._configService.getApiURI() + '/studentclass/studentsbyclassid/' + classId)
      .pipe(catchError(this._errorServ.handleError));
  }

  getStudentsCountInClass(classId: number) : Observable<number>{
    return this._http.get<number>(this._configService.getApiURI() + '/studentclass/studentcountsbyclassid/' + classId)
      .pipe(catchError(this._errorServ.handleError));
  }

  addStudentToClass(student: ClassStudent) {
    return this._http.post<User>(this._configService.getApiURI() + '/studentclass/register', student)
      .pipe(catchError(this._errorServ.handleError));
  }

  updateClassStudent(ClassStudentId: number , newValue: any , colName : string) {
    return this._http.put<ClassRoom>(this._configService.getApiURI() + '/studentclass/' + colName +'/'+ ClassStudentId, newValue)
      .pipe(catchError(this._errorServ.handleError));
  }

  removeStudentFromClass(studentClassId: number) {
    return this._http.delete(this._configService.getApiURI() + '/studentclass/' + studentClassId)
      .pipe(catchError(this._errorServ.handleError));
  }

  getMenuList(): Observable<Menu[]> {

    return of([
      { id: 0, name: 'home', link: './dashboard', icon: 'dashboard' },
      {
        id: 3, name: 'admin', link: '', icon: 'settings', childs:
          [
            { id: 4, name: 'manage-student', link: 'admin/manage-student', icon: 'group_add', parentId: 3 },
            { id: 4, name: 'manage-teacher', link: 'admin/manage-teacher', icon: 'airline_seat_recline_normal', parentId: 3 },
            { id: 5, name: 'manege-class', link: 'admin/manege-classrooms', icon: 'school', parentId: 3 }            
          ]
      },
    ]).pipe(catchError(this._errorServ.handleError));
  }


}
