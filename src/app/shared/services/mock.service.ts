import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from './storage-service';
import { User, ClassStudent, ClassRoom, RoleType } from '../../models';
import { delay, mergeMap, materialize, dematerialize, catchError } from 'rxjs/operators';

@Injectable()
export class MockService implements HttpInterceptor {
  users: User[] = [];
  classrooms: ClassRoom[] = [];
  classstudents: ClassStudent[] = [];

  constructor(private _storageService: StorageService) {
  }

  getMaxId(array) {
    if (array.length == 0) return 1;
    return Math.max.apply(Math, array.map(function (o) { return o.id; }))
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // array in local storage for registered users
    this.users = JSON.parse(this._storageService.getStorageValue('users')) || [];
    this.classrooms = JSON.parse(this._storageService.getStorageValue('classrooms')) || [];
    this.classstudents = JSON.parse(this._storageService.getStorageValue('classstudents')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // get users
      var that = this;
      if (request.url.match(/\/byrole\/\d+$/) && request.method === 'GET') {
        let urlParts = request.url.split('/');
        let roleid = parseInt(urlParts[urlParts.length - 1]);
        let matchedUsers = that.users.filter(user => { return user.roleId === roleid; });
        let userlist = matchedUsers.length ? matchedUsers : [];        
        return of(new HttpResponse({ status: 200, body: userlist }));
      }


      if (request.url.match(/\/user\/\d+$/) && request.method === 'GET') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedUsers = this.users.filter(user => { return user.id === id; });
        let user = matchedUsers.length ? matchedUsers[0] : null;

        return of(new HttpResponse({ status: 200, body: user }));
      }


      // register user
      if (request.url.endsWith('/user/register') && request.method === 'POST') {
        let newUser = request.body;
        // save new user
        newUser.id = this.getMaxId(this.users) + 1;
        this.users.push(newUser);
        this._storageService.setStorage('users', JSON.stringify(this.users));
        return of(new HttpResponse({ status: 200 }));
      }


      if (request.url.match(/\/user\/\d+$/) && request.method === 'PUT') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let editeduser = request.body;
        for (let i = 0; i < this.users.length; i++) {
          let user = this.users[i];
          if (user.id === id) {
            this.users[i] = editeduser;
            this._storageService.setStorage('users', JSON.stringify(this.users));
            break;
          }
        }

        return of(new HttpResponse({ status: 200 }));
      }

      // delete user
      if (request.url.match(/\/user\/\d+$/) && request.method === 'DELETE') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        for (let i = 0; i < this.users.length; i++) {
          let user = this.users[i];
          if (user.id === id) {
            switch (user.roleId) {
              case RoleType.student:
                if (this.classstudents.filter(c => c.studentId == id).length > 0)
                  return throwError('student is a class member');
                break;
              case RoleType.teacher:
                if (this.classrooms.filter(c => c.teacherId == id).length > 0)
                  return throwError('teacher has a class');
                break;
            }
            // delete user
            this.users.splice(i, 1);
            this._storageService.setStorage('users', JSON.stringify(this.users));
            break;
          }
        }

        return of(new HttpResponse({ status: 200 }));
      }

      //-----------------------------Manage Class -----------------------------

      // get class
      if (request.url.endsWith('/class') && request.method === 'GET') {
        this.fixTeacherNameInClass(this.classrooms);
        return of(new HttpResponse({ status: 200, body: this.classrooms }));
      }

      if (request.url.match(/\/class\/\d+$/) && request.method === 'GET') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedClass = this.classrooms.filter(clsroom => { return clsroom.id === id; });
        let myclass = matchedClass.length ? matchedClass[0] : null;
        myclass.teacherName = this.getUserInfoById(myclass.teacherId)['name'];
        return of(new HttpResponse({ status: 200, body: myclass }));
      }

      // register user
      if (request.url.endsWith('/class/register') && request.method === 'POST') {
        let newClass = request.body;

        // save new user
        newClass.id = this.getMaxId(this.classrooms) + 1;
        this.classrooms.push(newClass);
        this._storageService.setStorage('classrooms', JSON.stringify(this.classrooms));

        return of(new HttpResponse({ status: 200 }));
      }


      if (request.url.match(/\/class\/\d+$/) && request.method === 'PUT') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let editedClass = request.body;
        for (let i = 0; i < this.classrooms.length; i++) {
          let cls = this.classrooms[i];
          if (cls.id === id) {
            this.classrooms[i] = editedClass;
            this._storageService.setStorage('classrooms', JSON.stringify(this.classrooms));
            break;
          }
        }

        return of(new HttpResponse({ status: 200 }));
      }

      // delete user
      if (request.url.match(/\/class\/\d+$/) && request.method === 'DELETE') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        for (let i = 0; i < this.classrooms.length; i++) {
          let cls = this.classrooms[i];
          if (cls.id === id) {
            // delete user
            this.classrooms.splice(i, 1);
            this._storageService.setStorage('classrooms', JSON.stringify(this.classrooms));
            break;
          }
        }

        return of(new HttpResponse({ status: 200 }));
      }

      //------------------------------------student class

      if (request.url.match(/\/studentclass\/studentsbyclassid\/\d+$/) && request.method === 'GET') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedUsers = this.classstudents.filter(user => { return user.classId === id; });
        let users = matchedUsers.length ? this.fixStudentNameInClass(matchedUsers) : [];
        return of(new HttpResponse({ status: 200, body: users }));
      }

      if (request.url.match(/\/studentclass\/studentcountsbyclassid\/\d+$/) && request.method === 'GET') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let stCount = this.classstudents.filter(user => { return user.classId === id; }).length;
        return of(new HttpResponse({ status: 200, body: stCount }));
      }

      if (request.url.match(/\/studentclass\/\d+$/) && request.method === 'GET') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedUsers = this.classstudents.filter(user => { return user.id === id; });
        let user = matchedUsers.length ? this.fixStudentNameInClass(matchedUsers)[0] : null;
        return of(new HttpResponse({ status: 200, body: user }));
      }

      if (request.url.match(/\/studentclass\/[a-z,A-Z]*\/\d+$/) && request.method === 'PUT') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let colName = urlParts[urlParts.length - 2].toString();
        let newValue = request.body;
        for (let i = 0; i < this.classstudents.length; i++) {
          let cls = this.classstudents[i];
          if (cls.id === id) {
            this.classstudents[i][colName] = isNaN(newValue) ? newValue : +newValue;
            this._storageService.setStorage('classstudents', JSON.stringify(this.classstudents));
            break;
          }
        }

        return of(new HttpResponse({ status: 200 }));
      }

      // register user
      if (request.url.endsWith('/studentclass/register') && request.method === 'POST') {
        let newUser = request.body;

        // save new user
        newUser.id = this.getMaxId(this.classstudents) + 1;
        this.classstudents.push(newUser);
        this._storageService.setStorage('classstudents', JSON.stringify(this.classstudents));

        return of(new HttpResponse({ status: 200 }));
      }

      // delete user
      if (request.url.match(/\/studentclass\/\d+$/) && request.method === 'DELETE') {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        for (let i = 0; i < this.classstudents.length; i++) {
          let cls = this.classstudents[i];
          if (cls.id === id) {
            // delete user
            this.classstudents.splice(i, 1);
            this._storageService.setStorage('classstudents', JSON.stringify(this.classstudents));
            break;
          }
        }
        return of(new HttpResponse({ status: 200 }));
      }

      return next.handle(request);
      // .pipe(catchError(err=> {
      //   return throwError("Error thrown from catchError");
      // }));

    }))

      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  fixTeacherNameInClass(classes: ClassRoom[]) {
    classes.map(c => {
      var user = this.getUserInfoById(c.teacherId);
      c.teacherName = user.name + ' ' + user.surename;
    });
  }

  fixStudentNameInClass(classStudents: ClassStudent[]) {
    classStudents.map(c => {
      var user = this.getUserInfoById(c.studentId);
      c.studentName = user.name;
      c.studentSureName = user.surename;
      c.studentAge = user.age;
    });
    return classStudents;
  }

  getUserInfoById(id: number) {
    this.users = JSON.parse(this._storageService.getStorageValue('users')) || [];
    var user = this.users.find(c => c.id == id);
    return { name: user.name, surename: user.surename, age: user.age };
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockService,
  multi: true
};
