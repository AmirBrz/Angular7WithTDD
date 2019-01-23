import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ViewContainerRef, TemplateRef, ViewChildren, QueryList, Directive } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TableStructure, ActionType, ConditionOp } from 'src/app/models/TableStructure';


@Directive({
  selector: '[upId]',
})
export class UpdateDirective {
  @Input() upId: string;
  @Input() value: any;
  @Input() colName: string;

  constructor(public vcRef: ViewContainerRef) { }
}

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit {
  @ViewChild("updatePanel", { read: TemplateRef }) test: TemplateRef<any>;
  @ViewChildren("place", { read: ViewContainerRef }) place: QueryList<ViewContainerRef>;
  @ViewChildren(UpdateDirective) public updateplaces: QueryList<UpdateDirective>;

  displayedColumns: string[] = [];
  tableColumns: TableStructure[] = [];
  title: string = '';
  showUpdatePanel: boolean = false;
  myDataSource: MyDataSource = new MyDataSource();
  @Output() runAction: EventEmitter<any> = new EventEmitter<any>();
  constructor() {

  }

  @Input() set dataSource(data: any[]) {
    this.myDataSource.loadData(data);
  }

  @Input() set columns(col: TableStructure[]) {
    if (col == undefined)
      return;
    this.tableColumns = col;
    this.displayedColumns = col.filter((c) => { return c.show; }).map((obj) => obj.columnDef);
  }

  clickAction(id: any, actionType: ActionType) {
    if (actionType == ActionType.InlineEdit) {
      if (this.updateplaces == undefined) return;
      
      this.removeAllEditors();
      var updatePanel = this.updateplaces.find(c => c.upId.toString() === id);

      if (updatePanel == undefined) return;
      updatePanel.vcRef.createEmbeddedView(this.test, { rowId: id, rowValue: updatePanel.value, colName: updatePanel.colName });
    }
    else
      this.runAction.emit({ id: id, actionType: actionType })
  }

  update(rowid, newValue, colName) {
    this.runAction.emit({ id: rowid, newValue: newValue, colName: colName, actionType: ActionType.InlineEdit });
    if (this.updateplaces == undefined) return;
    this.removeAllEditors();
  }

  removeAllEditors() {
    if (this.updateplaces != undefined)
      this.updateplaces.forEach(c => { c.vcRef.detach(); });
  }

  checkCondition(row: any): boolean {
    var res: boolean = false;
    this.tableColumns.filter(f => f.conditionOp).forEach(c => {
      Object.keys(row).map(key => {
        if (key == c.columnDef) {
          switch (c.conditionOp) {
            case ConditionOp.Equal: res = (row[key] == c.conditionBaseVal ? true : false); break;
            case ConditionOp.Gt: res = (row[key] > c.conditionBaseVal ? true : false); break;
            case ConditionOp.Lt: res = (row[key] < c.conditionBaseVal ? true : false); break;
            case ConditionOp.Gte: res = (row[key] >= c.conditionBaseVal ? true : false); break;
            case ConditionOp.Lte: res = (row[key] <= c.conditionBaseVal ? true : false); break;
          }
        }
      });
    });

    return res;
  }

  ngOnInit() {

  }

  onRowClicked(row) {
    this.runAction.emit({ id: row.id, actionType: ActionType.SelectRow })
  }

}

export class MyDataSource implements DataSource<any> {
  private dataSubject = new BehaviorSubject<any[]>([]);
  public dataSubject$ = this.dataSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  loadData(data) {
    this.loadingSubject.next(true);
    this.dataSubject.next(data);
    this.loadingSubject.next(false);
  }
}

