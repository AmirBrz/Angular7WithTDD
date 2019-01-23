import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
//import { RoleGuardService } from './shared/services/role-guard.service'
import { AppComponent } from './app.component';
//import { ManageStudentComponent } from './component/manege-student.component';
import { DashBoardComponent } from './component/dashboard.component';
import { UserResolverService } from './shared/resolvers/user-resolver';
import { ClassRoomResolver } from './shared/resolvers/class-room.resolver';
import { FullComponent } from './layouts/full/full.component';
import { RoleType } from './models/User';
export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashBoardComponent, resolve: { result: UserResolverService }, data: { roleType: RoleType.student }
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule],
  providers: [
    UserResolverService,
    ClassRoomResolver
  ]
})
export class AppRoutingModule { }
