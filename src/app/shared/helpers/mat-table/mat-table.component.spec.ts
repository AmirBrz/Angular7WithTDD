import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material-module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MyDataSource, UpdateDirective } from './mat-table.component';
import { SafeHtmlPipe } from '../pipe/safehtml.pipe';
import { ShowDataPipe } from '../pipe/showdata';
import { TableStructure, ActionType, ConditionOp , ClassStudentColumns, RoleType, ClassStudent} from '../../../models';

import { MatTableComponent } from './mat-table.component';
import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, QueryList } from '@angular/core';

describe('MatTableComponent', () => {  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MaterialModule, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MatTableComponent, TestHostComponent , UpdateDirective, SafeHtmlPipe, ShowDataPipe ],
      providers : []
    })
      .compileComponents();
  }));


  function init() {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;
    return { fixture, component }
  }

  it('should create', () => {
    const { component } = init();
    expect(component).toBeTruthy();
  });

  it('shoulde get columns from Parent', () => {
    const { fixture, component } = init();
    component.matTableComponent.columns = component.columns;
    fixture.detectChanges();
    expect(component.matTableComponent.tableColumns).toEqual(ClassStudentColumns);      
  });

  it('shoulde get dataSource from Parent', () => {
    const { fixture, component } = init();
    component.matTableComponent.dataSource = component.dataList;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shoulde emit clicked action', () => {
    const { fixture, component } = init();
    component.matTableComponent.clickAction(0 , ActionType.Remove);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shoulde show editable cell after click update with InlineEdit param ', () => {    
    const { fixture, component } = init();
    component.matTableComponent.dataSource = component.dataList;    
    fixture.detectChanges();
    const updateplaces : QueryList<UpdateDirective> = component.matTableComponent.updateplaces;
    component.matTableComponent.clickAction(0 , ActionType.InlineEdit);
    fixture.detectChanges();
    expect(updateplaces).toBeDefined();
  });

  it('should emit updated value in editor cell', () => {
    const { fixture, component } = init();
    component.matTableComponent.dataSource = component.dataList;    
    const updateplaces : QueryList<UpdateDirective> = component.matTableComponent.updateplaces;
    component.matTableComponent.clickAction(0 , ActionType.InlineEdit);
    component.matTableComponent.update(0,5,'gpa')
    fixture.detectChanges();    
    expect(component).toBeTruthy();
  });

  it('should change row style base GT condition', () => {
    const { fixture, component } = init();
    component.matTableComponent.columns = component.columns;
    const row = {"classId":2,"studentId":10,"gpa":15,"id":2,"studentName":"amir","studentSureName":"yek","studentAge":"a"}
    const res = component.matTableComponent.checkCondition(row);
    fixture.detectChanges();
    expect(res).toEqual(true);
  });
});


@Component({
  selector: `host-component`,
  template: `<app-mat-table [dataSource]="dataList" [columns]="columns" (runAction)="fireAction($event)"></app-mat-table>`
})

class TestHostComponent {
  dataList: any[] = [{ id: 1, studentId: 1, gpa: 0, classId: 1, studentSureName: 'st surename' }];
  columns: TableStructure[] = ClassStudentColumns;
  @ViewChild(MatTableComponent)
  public matTableComponent: MatTableComponent;

  fireAction(event){
  }
}