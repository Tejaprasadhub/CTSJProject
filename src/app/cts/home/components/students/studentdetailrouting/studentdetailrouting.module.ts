import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentprofileComponent } from '../studentprofile/studentprofile.component';
import { StudenteditComponent } from '../studentedit/studentedit.component';
import { StudentreportsComponent } from '../studentreports/studentreports.component';
import { StudentmarksComponent } from '../studentmarks/studentmarks.component';
import { StudentmoreComponent } from '../studentmore/studentmore.component';
import { AuthenticationGuardService } from 'src/app/core/security/authentication-guard.service';

const studentDetailsRoutes:Routes=[
  {
    path:'student-profile',
    component:StudentprofileComponent,
    canActivate:[AuthenticationGuardService],
    outlet:'detail'
  },
  {
    path:'student-edit',
    component:StudenteditComponent,
    canActivate:[AuthenticationGuardService],
    outlet:'detail'
  },
  {
    path:'student-reports',
    component:StudentreportsComponent,
    canActivate:[AuthenticationGuardService],
    outlet:'detail'
  },
  {
    path:'student-marks',
    component:StudentmarksComponent,
    canActivate:[AuthenticationGuardService],
    outlet:'detail'
  },
  {
    path:'student-more',
    component:StudentmoreComponent,
    canActivate:[AuthenticationGuardService],
    outlet:'detail'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(studentDetailsRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class StudentdetailroutingModule { }
