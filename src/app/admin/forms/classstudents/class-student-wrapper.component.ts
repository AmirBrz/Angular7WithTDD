import { Component, OnInit, Input } from '@angular/core';
import { User, TableStructure, RoleType, ClassStudent, ActionType, ClassStudentAdminColumns } from 'src/app/models';
import { CrudService, SnackBarService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-class-student-wrapper',
  templateUrl: './class-student-wrapper.component.html',
  styleUrls: ['./class-student-wrapper.component.css']
})
export class ClassStudentWrapperComponent implements OnInit {

  currentUser: User;
  studentList: User[] = [];
  currentStudentCLass: ClassStudent;
  classStudentList: ClassStudent[] = [];
  columns: TableStructure[] = [];
  title: string = 'Manage ';
  listtitle: string = 'List of ';
  constructor(private _crudService: CrudService,
    private _snackBarService: SnackBarService,
    private _route: ActivatedRoute) {
    this.currentUser = new User(this._route.snapshot.data.roleType);
    this.title += RoleType[this.currentUser.roleId];
    this.listtitle += RoleType[this.currentUser.roleId];
  }

  selectedClassId: number;
  selectedClassName: string;
  showStudentClass: boolean = false;
  @Input() set currentClass(selectedClass: { className: string, classId: number }) {
    if (selectedClass == undefined)
      return;

    this.showStudentClass = true;
    this.selectedClassId = selectedClass.classId;
    this.selectedClassName = selectedClass.className;
    this._crudService.getStudentsInClass(this.selectedClassId).subscribe(
      (data) => this.classStudentList = data as ClassStudent[],
      (err) => this._snackBarService.error(err)
    )
  }


  ngOnInit() {
    this.getStudentList();
    this.columns = ClassStudentAdminColumns;
  }

  getStudentList() {
    this._crudService.getUserByRole(RoleType.student).subscribe(data => this.studentList = data);
  }

  fireAction(action) {
    switch (action.actionType as ActionType) {
      case ActionType.Remove: this.removeUser(+action.id); break;
      //case ActionType.Update: this.currentStudentCLass = this.classStudentList.find(c => c.id == action.id); break;
      case ActionType.InlineEdit: this.updateClassStudent(+action.id, action.newValue, action.colName); break;
    }
  }

  updateClassStudent(rowId: number, newValue: any, colNmae: string) {
    this._crudService.updateClassStudent(rowId, newValue, colNmae)
      .pipe(finalize(() => {
      }))
      .subscribe(
        data => {
          this.classStudentList[this.classStudentList.map(c => c.id).indexOf(rowId)][colNmae] = isNaN(newValue) ? newValue : +newValue;
          this._snackBarService.success('edited Successfully');
          this.reset();
        },
        err => {
          this._snackBarService.success('we have problem ', err);
        });
  }

  addStudentToClass(selectedStudentId: number) {
    let classStudent: ClassStudent = new ClassStudent(this.selectedClassId, selectedStudentId);
    this._crudService.addStudentToClass(classStudent)
      .pipe(finalize(() => {
      }))
      .subscribe(
        data => {
          this.studentList.map(c => {
            if (c.id == classStudent.studentId) {
              classStudent.studentName = c.name; classStudent.studentSureName = c.surename; classStudent.studentAge = c.age;
            }
          });
          this.classStudentList.push(classStudent);
          this._snackBarService.success('Added successfully');
          this.reset();
        },
        err => {
          this._snackBarService.success('we have problem ', err);
        });
  }

  studentSureNameIsValid(studentId) {
    if(this.classStudentList.filter(c => c.studentSureName == this.studentList.find(c => c.id == studentId).surename).length == 0){
      this.addStudentToClass(studentId);
    }
    else{
      this._snackBarService.warn('sure name is now added');
    }
  }

  removeUser(id) {
    var that = this;
    this._crudService.removeStudentFromClass(id)
      .subscribe(
        () => {
          that._snackBarService.success('Removed successfully');
          var index = that.classStudentList.map(c => { return c.id }).indexOf(id);
          that.classStudentList.splice(index, 1);
          this.reset();
        },
        err => { this._snackBarService.error(err) }
      )
  }

  reset() {
    this.classStudentList = [...this.classStudentList];
  }

}
