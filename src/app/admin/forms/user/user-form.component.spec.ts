import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { User, RoleType } from '../../../models';
import { Component, ViewChild } from '@angular/core';

describe('UserFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, NoopAnimationsModule],
      declarations: [UserFormComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  function init() {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;
    return { fixture, component }
  }

  it('create component', () => {
    const { component } = init();
    expect(component).toBeTruthy();
  });

  it('init component', () => {
    const { fixture, component } = init();
    fixture.detectChanges();
    expect(component.userFormComponent.currentUser).toEqual(component.currentUser);
  });

  it('reset', () => {
    const { fixture, component } = init();
    component.userFormComponent.reset();
    fixture.detectChanges();
    expect(component.userFormComponent.currentUser).toEqual(component.currentUser);
  });

  it('emit user model to wrapper', () => {
    const { fixture, component } = init();
    component.userFormComponent.currentUser = { id: 0, name: 'user name', surename: 'user sure name', roleId : RoleType.student | RoleType.teacher , age : 15};
    component.userFormComponent.sendResult.subscribe(
      () => expect(component.currentUser).toEqual(component.userFormComponent.currentUser)
    );
    component.userFormComponent.updateInsert();
    fixture.detectChanges();
  });
});


@Component({
  selector: `host-component`,
  template: `<app-user-form [currentUser]="currentUser" (sendResult)="changeModel($event)"></app-user-form>`
})

class TestHostComponent {
  // currentUser: User = { id: undefined, name: 'name', surename : 'sure name' , age : 15 ,  roleId : 0};
   currentUser: User = { id: undefined, name: 'name', surename : 'sure name' , age : 15 ,  roleId : RoleType.student | RoleType.teacher};
  @ViewChild(UserFormComponent)
  public userFormComponent: UserFormComponent;

  changeModel(user) {
    this.currentUser = user;
  }
}

