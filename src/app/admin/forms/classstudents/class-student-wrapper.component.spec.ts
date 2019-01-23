import { async, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoleType, ActionType, User, ClassStudentAdminColumns, ClassStudent } from '../../../models';
import { CrudService, SnackBarService } from '../../../shared/services';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ClassStudentWrapperComponent } from './class-student-wrapper.component';

describe('ClassStudentWrapperComponent', () => {
  const classStudentList: ClassStudent[] = [{ id: 1, studentId: 1, gpa: 0, classId: 1, studentSureName: 'st surename' }];
  const studentList: User[] = [
    { id: 0, name: 'st name one', surename: 'st surename one', roleId: RoleType.student, age: 27 },
    { id: 1, name: 'st name', surename: 'st surename', roleId: RoleType.student, age: 25 }];
  const route = ({
    snapshot: {
      data:
      {
        roleType: RoleType.student
      }
    }
  } as any) as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, NoopAnimationsModule],
      declarations: [ClassStudentWrapperComponent , TestHostComponent],
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
    const fixture = TestBed.createComponent(TestHostComponent);
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

  it('should get student list in init', async(() => {
    const { fixture, component, crudService } = init();
    const students = studentList; 
    const spy = spyOn(crudService, 'getUserByRole').and.returnValue(of(students));
    component.classStudentWrapperComponent.ngOnInit();
    fixture.detectChanges();
    expect(component.classStudentWrapperComponent.studentList).toEqual(students);
    expect(component.classStudentWrapperComponent.columns).toEqual(ClassStudentAdminColumns);
    expect(component.classStudentWrapperComponent.selectedClassId).toEqual(component.selectedClass.classId);
    expect(spy).toHaveBeenCalled();
  }))


  it('shoud faild when add new student with repeated surename ', () => {
    const { component, snackBarService, fixture } = init();
    component.classStudentWrapperComponent.classStudentList = classStudentList;
    component.classStudentWrapperComponent.studentList = studentList;

    const spy = spyOn(snackBarService, 'warn').and.callThrough();      
    component.classStudentWrapperComponent.studentSureNameIsValid(1);
    fixture.detectChanges();
    expect(component.classStudentWrapperComponent.classStudentList.length).toEqual(1);
    expect(spy).toHaveBeenCalled();
  });

  it('shoud add new student with different surename ', () => {
    const { component, crudService, fixture } = init();
    component.classStudentWrapperComponent.studentList = studentList;

    component.classStudentWrapperComponent.selectedClassId = 1;
    const spy = spyOn(crudService, 'addStudentToClass').and.returnValue(of(new Observable<any>()));
    component.classStudentWrapperComponent.studentSureNameIsValid(0);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.classStudentWrapperComponent.classStudentList.length).toEqual(1);
  });



  it('should change gpa column after inline edit ', () => {
    const { fixture, component, crudService , snackBarService} = init();

    component.classStudentWrapperComponent.classStudentList = classStudentList;
    component.classStudentWrapperComponent.studentList = studentList;

    const spy1 = spyOn(crudService, 'updateClassStudent').and.returnValue(of(new Observable<any>()));
    const spy2 = spyOn(snackBarService, 'success').and.callThrough();
    component.classStudentWrapperComponent.fireAction({ id: 1, newValue: 3.4, colName: 'gpa', actionType: ActionType.InlineEdit });

    fixture.detectChanges();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should remove student from class', () => {
    const { component, crudService, fixture } = init();
    component.classStudentWrapperComponent.classStudentList = [{ id: 1, studentId: 1, gpa: 0, classId: 1, studentSureName: 'surename' }];
    component.classStudentWrapperComponent.studentList =
      [{ id: 0, name: 'st name one', surename: 'st surename one', roleId: RoleType.student, age: 27 },
      { id: 1, name: 'st name', surename: 'surename', roleId: RoleType.student, age: 25 }];

    const spy = spyOn(crudService, 'removeStudentFromClass').and.returnValue(of(new Observable<any>()));
    component.classStudentWrapperComponent.fireAction({ id: 1, actionType: ActionType.Remove });
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

});


@Component({
  selector: `host-component`,
  template: `<app-class-student-wrapper [currentClass]="selectedClass"></app-class-student-wrapper>`
})

class TestHostComponent {
  selectedClass : { className: string, classId: number }= { className : 'class Name' , classId : 1};
  @ViewChild(ClassStudentWrapperComponent)
  public classStudentWrapperComponent: ClassStudentWrapperComponent;
}