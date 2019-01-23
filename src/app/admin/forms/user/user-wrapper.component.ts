import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User, UserAdminColumns, TableStructure, ActionType, RoleType } from '../../../models';
import { CrudService, SnackBarService } from '../../../shared/services';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserWrapperComponent implements OnInit {

  currentUser: User;
  userList: User[] = [];
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

  ngOnInit() {
    this.userList = this._route.snapshot.data.result as any[];
    this.columns = UserAdminColumns;
  }

  fireAction(action) {
    switch (action.actionType as ActionType) {
      case ActionType.Remove: this.removeUser(+action.id); break;
      case ActionType.Update: this.currentUser = this.userList.find(c => c.id == action.id); break;
    }
  }

  changeModel(user: User) {
    if (user.id)
      this.updateUser(user);
    else
      this.addUser(user);
  }

  updateUser(user) {
    this._crudService.updateUser(user)
      .pipe(finalize(() => {
      }))
      .subscribe(
        data => {
          this.userList[this.userList.map(c => c.id).indexOf(user.id)] = user
          this._snackBarService.success('edited Successfully');
          this.reset();
        },
        err => {
          this._snackBarService.success('we have problem ', err);
        });
  }

  addUser(user) {
    this._crudService.insertUser(user)
      .pipe(finalize(() => {
      }))
      .subscribe(
        data => {
          this.userList.push(user);
          this._snackBarService.success('Added successfully');
          this.reset();
        },
        err => {
          this._snackBarService.success('we have problem ', err);
        });
  }

  removeUser(id) {
    this._crudService.deleteUser(id)
      .subscribe(
        () => {
          this._snackBarService.success('Removed successfully');
          var index = this.userList.map(c => { return c.id }).indexOf(id);
          this.userList.splice(index, 1);
          this.reset();
        },
        err => { this._snackBarService.error(err) }
      )
  }

  reset() {
    this.currentUser = new User(this._route.snapshot.data.roleType);
    this.userList = [...this.userList];
  }
}
