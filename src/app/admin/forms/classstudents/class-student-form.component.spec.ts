import { async, TestBed } from '@angular/core/testing';
import { ClassStudentFormComponent } from './class-student-form.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { RoleType } from '../../../models';
import { Component, ViewChild } from '@angular/core';


describe('ClassStudentFormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, NoopAnimationsModule],
      declarations: [ClassStudentFormComponent, TestHostComponent]
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
    expect(component.classStudentFormComponent.studentList).toEqual(component.studentList);
  });

  it('reset', () => {
    const { fixture, component } = init();
    component.classStudentFormComponent.reset();
    fixture.detectChanges();
    expect(component.classStudentFormComponent.selectedStudentId).toEqual(undefined);
  });

  it('should emit selected student to wrapper and add to class', () => {
    const { fixture, component } = init();
    component.classStudentFormComponent.selectedStudentId = 1;
    component.classStudentFormComponent.sendResult.subscribe(
      () => expect(component.studentId).toEqual(component.classStudentFormComponent.selectedStudentId)
    );
    component.classStudentFormComponent.updateInsert();
    fixture.detectChanges();
  });
});



@Component({
  selector: `host-component`,
  template: `<app-class-student-form [studentList]="studentList" (sendResult)="addStudentToClass($event)"></app-class-student-form>`
})

class TestHostComponent {
  studentList = [{ id: 0, name: 'student name', surename: 'student sureame', roleId: RoleType.student, age: 25 }];
  studentId = undefined;
  @ViewChild(ClassStudentFormComponent)
  public classStudentFormComponent: ClassStudentFormComponent;

  addStudentToClass(studentId) {
    this.studentId = studentId;
  }
}


