import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserWrapperComponent } from './forms/user/user-wrapper.component'
import { AdminDashboardComponent } from './forms/admin-dashboard.component'
import { RoleType } from '../models';
import { UserResolverService } from '../shared/resolvers/user-resolver';
import { ClassRoomResolver } from '../shared/resolvers/class-room.resolver';
import { ClassroomWrapperComponent } from './forms/classrooms/classroom-wrapper.component';
import { ClassStudentWrapperComponent } from './forms/classstudents/class-student-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    data: {
      isLogin: true
    },
    children: [
      {
        path: 'manage-student',
        resolve: { result: UserResolverService },
        component: UserWrapperComponent,
        data: { roleType: RoleType.student }
      },
      {
        path: 'manage-teacher',
        resolve: { result: UserResolverService },
        component: UserWrapperComponent,
        data: { roleType: RoleType.teacher }
      },
      {
        path: 'manege-classrooms',
        resolve: {
          classes: ClassRoomResolver,
          teachers: UserResolverService
        },
        component: ClassroomWrapperComponent,
        data: { roleType: RoleType.teacher }
      }, 
      {
        path: 'manage-classstudnt',
        resolve: {
          students: UserResolverService
        },
        component: ClassStudentWrapperComponent,
        data: { roleType: RoleType.student }
      }
    ]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
