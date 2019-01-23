import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-class-student-form',
  templateUrl: './class-student-form.component.html',
  styleUrls: ['./class-student-form.component.css']
})
export class ClassStudentFormComponent implements OnInit {
  @Input() studentList : User[] = [];
  selectedStudentId : number;
  @Output() sendResult: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  updateInsert() {
    this.sendResult.emit(this.selectedStudentId);
  }

  reset(){
    this.selectedStudentId = undefined;
  }

}
