import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ClassRoom, User } from 'src/app/models';

@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.css']
})
export class ClassroomFormComponent implements OnInit {
  @Input() currentClassRoom: ClassRoom;
  @Input() teacherList : User[] = [];
  @Output() sendResult: EventEmitter<ClassRoom> = new EventEmitter<ClassRoom>();

  constructor() { }

  ngOnInit() {
  }
  
  updateInsert() {
    this.sendResult.emit(this.currentClassRoom);
  }
  reset(){
    this.currentClassRoom = new ClassRoom();
  }
}
