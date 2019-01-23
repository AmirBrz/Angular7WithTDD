import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserFormComponent } from './forms/user/user-form.component';
import { UserWrapperComponent } from './forms/user/user-wrapper.component';
import { AdminDashboardComponent } from './forms/admin-dashboard.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ClassroomWrapperComponent } from './forms/classrooms/classroom-wrapper.component';
import { ClassroomFormComponent } from './forms/classrooms/classroom-form.component';
import { ClassStudentFormComponent } from './forms/classstudents/class-student-form.component';
import { ClassStudentWrapperComponent } from './forms/classstudents/class-student-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [UserFormComponent, UserWrapperComponent, AdminDashboardComponent, ClassroomWrapperComponent, ClassroomFormComponent, ClassStudentFormComponent, ClassStudentWrapperComponent]
})
export class AdminModule { }
