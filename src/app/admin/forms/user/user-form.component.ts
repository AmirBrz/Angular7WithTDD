import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../../../models/User';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() currentUser: User;
  @Output() sendResult: EventEmitter<User> = new EventEmitter<User>();
  constructor() {

  }

  ngOnInit() {

  }

  updateInsert() {
    this.sendResult.emit(this.currentUser);
  }

  reset() {
    if (this.currentUser != undefined)
      this.currentUser = new User(this.currentUser.roleId);
  }
}
