import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TeachersComponent } from './teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';


const teacherroutes: Routes = [
  { path: '', component: TeachersComponent },
  { path: 'add-teacher', component: AddTeacherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(teacherroutes)],
  exports:[
    RouterModule
  ]
  
})
export class TeachersRoutingModule { }
