import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ClassroomWrapperComponent } from './classroom-wrapper.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoleType, ActionType, ClassRoom, User } from '../../../models';
import { CrudService, SnackBarService } from '../../../shared/services';
import { ActivatedRoute, Data } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Observable, of, throwError, observable } from 'rxjs';

describe('ClassroomWrapperComponent', () => {
  const classRoomList: ClassRoom[] = [{ id: 1, className: 'class name', teacherId: 0, location: '' }];
  const teacherList: User[] = [{ id: 0, name: 'tName', surename: 'teacherSureName', roleId: RoleType.teacher, age: 25 }];
  const route = ({
    snapshot: {
      data:
      {
        classes: classRoomList,
        teachers: teacherList
      }
    }
  } as any) as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, NoopAnimationsModule],
      declarations: [ClassroomWrapperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [CrudService,
        {
          provide: ActivatedRoute,
          useValue: route
        }
      ]
    })
      .compileComponents();
  }));

  function init() {
    const fixture = TestBed.createComponent(ClassroomWrapperComponent);
    const component = fixture.componentInstance;
    const crudService = fixture.debugElement.injector.get(CrudService);
    const snackBarService = fixture.debugElement.injector.get(SnackBarService);
    const route = fixture.debugElement.injector.get(ActivatedRoute);
    return { fixture, component, crudService, snackBarService, route }
  }

  it('should create', () => {
    const { component } = init();
    expect(component).toBeTruthy();
  });

  it('should assign models when route is resolved', async(() => {
    const { fixture, component } = init();
    component.classRoomList = route.snapshot.data.classes;
    component.teacherList = route.snapshot.data.teachers;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.classRoomList).toEqual(route.snapshot.data.classes);
      expect(component.teacherList).toEqual(route.snapshot.data.teachers);
    })
  }))

  it('add ', () => {
    const { fixture, component, crudService, snackBarService } = init();
    const classRoom = new ClassRoom();
    classRoom.className = 'new class name'; classRoom.teacherId = 0; classRoom.location = '';

    const addSpy = spyOn(crudService, 'addClass').and.returnValue(of(new Observable<any>()));
    component.changeModel(classRoom);
    fixture.detectChanges();
    expect(component.classRoomList.length).toEqual(1);
    expect(addSpy).toHaveBeenCalled();
  });

  it('click on update menu ', () => {
    const { fixture, component } = init();
    const classroom : ClassRoom = { id: 1, className: 'class name', teacherId: 0, location: '' };
    component.classRoomList = [classroom];
    
    component.fireAction({ id: 1, actionType: ActionType.Update });

    fixture.detectChanges();
    expect(component.currentClassRoom).toEqual(classroom);
  });

  it('click on class list row to show student list', () => {
    const { fixture, component } = init();
    const classroom : ClassRoom = { id: 1, className: 'class Name', teacherId: 0, location: '' };
    component.classRoomList = [classroom];
    
    component.fireAction({ id: 1, actionType: ActionType.SelectRow });

    fixture.detectChanges();
    expect(component.selectedClass).toEqual({ className: 'class Name', classId: 1 });
  });

  it('edit classroom', () => {
    const { fixture, component, crudService, snackBarService } = init();
    const classroom = { id: 1, className: 'class name', teacherId: 0, location: '' };
    
    classroom.className = 'changed class name';
    const spy = spyOn(crudService, 'updateClass').and.returnValue(of(new Observable<any>()));
    component.changeModel(classroom);

    fixture.detectChanges();
    expect(classroom.className).toEqual('changed class name');
    expect(spy).toHaveBeenCalled();
  });


  it('remove classroom validation false', () => {
    const { component, crudService, fixture } = init();
    component.classRoomList = [{ id: 1, className: 'class name', teacherId: 0, location: '' }];

    const spy = spyOn(crudService, 'getStudentsCountInClass').and.returnValue(of(1));
    component.fireAction({ id: 1, actionType: ActionType.Remove });
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('remove classroom validation true', () => {
    const { component, crudService, fixture } = init();
    component.classRoomList = [{ id: 1, className: 'class name', teacherId: 0, location: '' }];
    const spy1 = spyOn(crudService, 'getStudentsCountInClass').and.returnValue(of(0));
    const spy2 = spyOn(crudService, 'deleteClass').and.returnValue(of(new Observable<any>()));    
    component.fireAction({ id: 1, actionType: ActionType.Remove });
    fixture.detectChanges();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });



  // it('add and edit classroom', () => {
  //   const { fixture, component, crudService, snackBarService } = init();
  //   const classRoom = new ClassRoom();
  //   classRoom.className = 'new class name'; classRoom.teacherId = 0;classRoom.location = '' ;

  //   spyOn(crudService, 'addClass').and.callThrough();
  //   // component.classRoomList.push(classRoom);
  //   component.changeModel(classRoom);
  //   // snackBarService.success('Added successfully');          
  //   fixture.detectChanges();
  //   expect(component.classRoomList.length).toEqual(1);


  //   classRoom.className = 'changed class name';
  //   spyOn(crudService, 'updateClass').and.callThrough();      
  //   // component.classRoomList[component.classRoomList.map(c => c.id).indexOf(classRoom.id)] = classRoom;
  //   // snackBarService.success('edited Successfully');          
  //   classRoom.id = 0;
  //   component.changeModel(classRoom);
  //   fixture.detectChanges();
  //   expect(component.classRoomList.find(c => c.id == 0).className).toEqual('changed class name');
  // });

  // it('add classroom', () => {
  //   const { fixture, component, crudService, snackBarService } = init();
  //   const classRoom: ClassRoom = { id: undefined, className: 'new class name', teacherId: 0, location: '' }

  //   spyOn(crudService, 'addClass').and.returnValue(
  //     Observable.create((observer: Observable<any>) => {
  //       observer.subscribe(data => {
  //         component.teacherList.map(c => { if (c.id == classRoom.teacherId) classRoom.teacherName = c.name + ' ' + c.surename });
  //         component.classRoomList.push(classRoom);
  //         snackBarService.success('edited Successfully');          
  //       },
  //         err => this._snackBarService.success('we have problem ', err))
  //       return observer;
  //     }));

  //   component.changeModel(classRoom);
  //   fixture.detectChanges();
  //   expect(component.classRoomList.length).toEqual(1);
  // });

  // it('edit classroom', () => {
  //   const { component , crudService , fixture} = init();
  //   const classRoom: ClassRoom = { id: 1, className: 'changed class name', teacherId: 0, location: '' }

  //   spyOn(crudService , 'updateClass').and.returnValue(
  //     Observable.create((observer: Observable<any>) => {
  //       observer.subscribe(data => {
  //         component.teacherList.map(c => { if (c.id == classRoom.teacherId) classRoom.teacherName = c.name + ' ' + c.surename });
  //         component.classRoomList[component.classRoomList.map(c => c.id).indexOf(classRoom.id)] = classRoom;
  //       },
  //         err => this._snackBarService.success('we have problem ', err))
  //       return observer;
  //     }));

  //   component.changeModel(classRoom);
  //   fixture.detectChanges();
  //   expect(component.classRoomList.find(c=>c.id == 1).className).toEqual('changed class name');
  // });

});
