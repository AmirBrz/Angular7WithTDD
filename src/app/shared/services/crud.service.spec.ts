import { async, getTestBed, TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { CrudService } from './crud.service';
import { ConfigService } from './config.service';
import { ErrorService } from './error.service';
import { MockService } from './mock.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoleType, User } from 'src/app/models';
import { of, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ClassRoom, ClassStudent } from 'src/app/models';


describe('CrudService', () => {
  let injector;
  let backend: MockBackend;
  let crudService: CrudService;
  let configService: ConfigService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudService, ConfigService, ErrorService, MockService, BaseRequestOptions, MockBackend,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }],
      imports: [HttpClientTestingModule]
    });

    // const testbed = getTestBed();
    // backend = TestBed.get(MockBackend);
    // crudService = TestBed.get(CrudService);
    // configService = TestBed.get(ConfigService);

    injector = getTestBed();
    backend = TestBed.get(MockBackend);
    crudService = injector.get(CrudService);
    configService = injector.get(ConfigService);
    httpMock = injector.get(HttpTestingController);
  });



  // function setup() {
  //   const testbed = getTestBed();
  //   const backend = testbed.get(MockBackend);
  //   const crudService = TestBed.get(CrudService);
  //   const configService = TestBed.get(ConfigService);
  //   const httpTestingController = TestBed.get(HttpTestingController);
  //   return { crudService, configService, httpTestingController, backend };
  // }

  function setupConnections(backend: MockBackend, options: any, route: string) {
    backend.connections.subscribe((connection: MockConnection) => {
      if (connection.request.url === route) {
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    });
  }


  afterEach(() => {
    httpMock.verify();
  });

  it('should return the list of student users', async () => {
    const user = [{ id: 1, name: 'user', surename: 'sure', age: 10, roleId: RoleType.student }];
    crudService.getUserByRole(RoleType.student).subscribe((data: User[]) => {
      expect(data).toBe(user);
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/user/byrole/' + RoleType.student);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('json');
    req.flush(user);
  });

  it('should insert user ', (done) => {
    const data = { id: 1, name: 'user', surename: 'sure', age: 10, roleId: RoleType.student };
    crudService.insertUser(data).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/user/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(new HttpResponse({ status: 200 }));
  });


  it('should update User', (done) => {
    const user = { id: 1, name: 'edited user', surename: 'sure', age: 10, roleId: RoleType.student };
    crudService.updateUser(user).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/user/' + user.id);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(user);
    expect(req.request.responseType).toEqual('json');
    req.flush(new HttpResponse({ status: 200 }));
  });

  it('should delete User', (done) => {
    const user = { id: 1, name: 'deleted user', surename: 'sure', age: 10, roleId: RoleType.student };
    crudService.deleteUser(1).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/user/' + user.id);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.responseType).toEqual('json');
    req.flush(new HttpResponse({ status: 200 }));
  });

  it('should delete faild if User be a member of class', (done) => {
    const user = { id: 1, name: 'deleted user', surename: 'sure', age: 10, roleId: RoleType.student };
    crudService.deleteUser(1).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(400);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/user/' + user.id);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.responseType).toEqual('json');
    req.flush(new HttpResponse({ status: 400 , statusText : 'student is a class member' }));
  });

  //----------------------------- class 

  it('should return the list of class', async () => {
    const classes : ClassRoom[] = [{ id: 1, className: 'class Name', teacherId: 1, location : 'loc' }];
    crudService.getClass().subscribe((data: ClassRoom[]) => {
      expect(data).toBe(classes);
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/class');
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('json');
    req.flush(classes);
  });

  
  it('should add user ', (done) => {
    const newClass : ClassRoom  = { id: 1, className: 'class Name', teacherId: 1, location : 'loc' };
    crudService.addClass(newClass).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/class/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    expect(req.request.body).toEqual(newClass);
    req.flush(new HttpResponse({ status: 200 }));
  });

  it('should update class', (done) => {
    const editedClass : ClassRoom  = { id: 1, className: 'edited class Name', teacherId: 1, location : 'loc' };
    crudService.updateClass(editedClass).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/class/' + editedClass.id);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(editedClass);
    expect(req.request.responseType).toEqual('json');
    req.flush(new HttpResponse({ status: 200 }));
  });

  it('should delete class', (done) => {
    const deletedClass : ClassRoom  = { id: 1, className: 'deleted class Name', teacherId: 1, location : 'loc' };
    crudService.deleteClass(1).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/class/' + deletedClass.id);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.responseType).toEqual('json');
    req.flush(new HttpResponse({ status: 200 }));
  });

  //-------------------------------- studentclass-----------------

  it('should return a list of students in selected class', async () => {
    const classStudents : ClassStudent[] = [{ id: 1, classId: 1, gpa : 0 , studentId : 1 }];
    crudService.getStudentsInClass(1).subscribe((data: ClassStudent[]) => {
      expect(data).toBe(classStudents);
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/studentclass/studentsbyclassid/' + 1 );
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('json');
    req.flush(classStudents);
  });

  it('should return count of students in selected class', async () => {
    const classStudents : ClassStudent[] = [{ id: 1, classId: 1, gpa : 0 , studentId : 1 }];
    crudService.getStudentsCountInClass(1).subscribe((data: number) => {
      expect(data).toBe(1);
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/studentclass/studentcountsbyclassid/' + 1 );
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('json');
    req.flush(classStudents.length);
  });

  it('should add student to class ', (done) => {
    const newStudent : ClassStudent = { id: 1, classId: 1, gpa : 0 , studentId : 1 };
    crudService.addStudentToClass(newStudent).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/studentclass/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    expect(req.request.body).toEqual(newStudent);
    
    req.flush(new HttpResponse({ status: 200 }));
  });


  it('should edit one column of student like gpa ', (done) => {
    const newStudent : ClassStudent = { id: 1, classId: 1, gpa : 0 , studentId : 1 };
    crudService.updateClassStudent(1 , 3.3 , 'gpa').subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/studentclass/' + 'gpa/' + 1);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.responseType).toEqual('json');
    expect(req.request.body).toEqual(3.3);
    
    req.flush(new HttpResponse({ status: 200 }));
  });

  it('should remove students from class', (done) => {
    const student : ClassStudent = { id: 1, classId: 1, gpa : 0 , studentId : 1 };
    crudService.removeStudentFromClass(1).subscribe((response: HttpResponse<any>) => {
      expect(response.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne(configService.getApiURI() + '/studentclass/' + student.id);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.responseType).toEqual('json');
    req.flush(new HttpResponse({ status: 200 }));
  });


});
