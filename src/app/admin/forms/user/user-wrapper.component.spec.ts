import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoleType, ActionType, ClassRoom, User, UserAdminColumns } from '../../../models';
import { CrudService, SnackBarService } from '../../../shared/services';
import { ActivatedRoute, Data } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Observable, of, throwError, observable } from 'rxjs';
import { UserWrapperComponent } from './user-wrapper.component';

describe('UserWrapperComponent', () => {
  const userList: User[] = [{ id: 0, name: 'user name 1', surename: 'sure name 1', roleId: RoleType.teacher | RoleType.student, age: 25 }];
  const route = ({
    snapshot: {
      data:
      {
        result: userList
      }
    }
  } as any) as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, NoopAnimationsModule],
      declarations: [UserWrapperComponent],
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
    const fixture = TestBed.createComponent(UserWrapperComponent);
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
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.userList).toEqual(route.snapshot.data.result);
      expect(component.columns).toEqual(UserAdminColumns);
    })
  }))

  it('add user', async() => {
    const { fixture, component, crudService, snackBarService } = init();
    const user = new User(RoleType.student | RoleType.teacher);
    user.name = 'new user name'; user.surename = 'sure name'; user.age = 25;
    const addSpy = spyOn(crudService, 'insertUser').and.returnValue(of(new Observable<any>()));
    component.addUser(user);
    fixture.detectChanges();    
    expect(addSpy).toHaveBeenCalled();
  });

  it('click on update menu ', () => {
    const { fixture, component } = init();
    component.userList = userList;
    component.fireAction({ id: 1, actionType: ActionType.Update });
    fixture.detectChanges();
    expect(component.currentUser).toEqual(userList[1]);
  });

  it('should edit user', async() => {
    const { fixture, component, crudService } = init();
    const editedUser : User = { id: 0, name: 'changed user name', surename: 'sure name 1', roleId: RoleType.teacher | RoleType.student, age: 25 };
    const spy = spyOn(crudService, 'updateUser').and.returnValue(of(new Observable<any>()));
    component.updateUser(editedUser);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });



  it('should remove user from list', () => {
    const { component, crudService, fixture } = init();
    component.userList = userList;
    const spy1 = spyOn(crudService, 'deleteUser').and.returnValue(of(new Observable<any>()));
    component.fireAction({ id: 1, actionType: ActionType.Remove });
    fixture.detectChanges();

    expect(component.userList.length).toEqual(1);
    expect(spy1).toHaveBeenCalled();
  });
});
