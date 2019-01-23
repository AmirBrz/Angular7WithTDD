import { Component, OnInit } from '@angular/core';
import { ClassRoom, TableStructure, ClassRoomAdminColumns, ActionType, User } from 'src/app/models';
import { CrudService, SnackBarService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-classroom-wrapper',
  templateUrl: './classroom-wrapper.component.html',
  styleUrls: ['./classroom-wrapper.component.css']
})
export class ClassroomWrapperComponent implements OnInit {

  currentClassRoom: ClassRoom;
  classRoomList: ClassRoom[] = [];
  teacherList: User[] = [];
  columns: TableStructure[] = [];
  title: string = 'Manage class room';
  listtitle: string = 'List of class rooms';
  removeIsValid: Subject<boolean> = new Subject<boolean>();
  removeIsValid$ = this.removeIsValid.asObservable();
  selectedClass: { className: string, classId: number } = undefined;
  constructor(private _crudService: CrudService,
    private _snackBarService: SnackBarService,
    private _route: ActivatedRoute) {
    this.currentClassRoom = new ClassRoom();
  }

  ngOnInit() {
    this.classRoomList = this._route.snapshot.data.classes as any[];
    this.teacherList = this._route.snapshot.data.teachers as any[];
    this.columns = ClassRoomAdminColumns;
  }

  fireAction(action) {
    switch (action.actionType as ActionType) {
      case ActionType.Remove: this.removeValidation(+action.id); break;
      case ActionType.Update: this.currentClassRoom = this.classRoomList.find(c => c.id == action.id); break;
      case ActionType.SelectRow: {
        this.selectedClass = { className: this.classRoomList.find(c => c.id == action.id).className, classId: action.id };
      }
        break;
    }
  }


  changeModel(ClassRoom: ClassRoom) {
    if (ClassRoom.id) {
      this._crudService.updateClass(ClassRoom)
        .subscribe(
          data => {            
            this.fixTeacherName(ClassRoom);
            this.classRoomList[this.classRoomList.map(c => c.id).indexOf(ClassRoom.id)] = ClassRoom;
            this._snackBarService.success('edited Successfully');
            this.reset();
          },
          err => {
            this._snackBarService.success('we have problem ', err);
          });
    }
    else {
      this._crudService.addClass(ClassRoom)
        .subscribe(
          data => {
            this.fixTeacherName(ClassRoom);
            this.classRoomList.push(ClassRoom);
            this._snackBarService.success('Added successfully');
            this.reset();
          },
          err => {
            this._snackBarService.success('we have problem ', err);
          });
    }
  }

  fixTeacherName(ClassRoom: ClassRoom){
    this.teacherList.map(c => { if (c.id == ClassRoom.teacherId) ClassRoom.teacherName = c.name + ' ' + c.surename });
  }

  removeClassRoom(id) {
    this._crudService.deleteClass(id)
      .subscribe(
        () => {
          this._snackBarService.success('Removed successfully');
          var index = this.classRoomList.map(c => { return c.id }).indexOf(id);
          this.classRoomList.splice(index, 1);
          this.reset();
        },
        err => { alert(err) }
      );
  }

  removeValidation(id : number) {
    this._crudService.getStudentsCountInClass(id).subscribe(
      (memebers) => {
        if (memebers > 0) {
          this._snackBarService.warn(`you can not Removed class , we have ${memebers} students in this class`);          
        }
        else
          this.removeClassRoom(id);
      },
      (err) => this._snackBarService.error(err)
    )
  }

  reset() {
    this.currentClassRoom = new ClassRoom();
    this.classRoomList = [...this.classRoomList];
  }

}
