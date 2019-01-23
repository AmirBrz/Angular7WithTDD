import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { ClassroomFormComponent } from './classroom-form.component';
import { ClassRoom, RoleType } from '../../../models';
import { Component, ViewChild } from '@angular/core';
describe('ClassroomFormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, NoopAnimationsModule],
      declarations: [ClassroomFormComponent, TestHostComponent]
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
    expect(component.classroomFormComponent.teacherList).toEqual(component.teacherList);
  });

  it('reset', () => {
    const { fixture, component } = init();
    //component.classroomFormComponent.currentClassRoom = new ClassRoom();
    //const compile = fixture.debugElement.nativeElement;
    component.classroomFormComponent.reset();
    fixture.detectChanges();
    expect(component.classroomFormComponent.currentClassRoom).toEqual(component.currentClassRoom);
  });

  it('emit classroom model to wrapper', () => {
    const { fixture, component } = init();
    component.classroomFormComponent.currentClassRoom = { id: 0, className: 'test class', teacherId: 0, location: 'test loc' };
    component.classroomFormComponent.sendResult.subscribe(
      () => expect(component.currentClassRoom).toEqual(component.classroomFormComponent.currentClassRoom)
    );
    component.classroomFormComponent.updateInsert();
    fixture.detectChanges();
  });
});


@Component({
  selector: `host-component`,
  template: `<app-classroom-form [currentClassRoom]="currentClassRoom" [teacherList]="teacherList" (sendResult)="changeModel($event)"></app-classroom-form>`
})

class TestHostComponent {
  teacherList = [{ id: 0, name: 'tName', surename: 'teacherSureName', roleId: RoleType.teacher, age: 25 }];
  currentClassRoom = { id: undefined, className: 'tName', teacherId: 0, location: '' };
  @ViewChild(ClassroomFormComponent)
  public classroomFormComponent: ClassroomFormComponent;

  changeModel(classroom){
    this.currentClassRoom = classroom;
  }
}


