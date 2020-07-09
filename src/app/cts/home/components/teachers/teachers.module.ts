
//common import for every child/feature module
import { NgModule  } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TeachersRoutingModule } from './teachers-routing.module';


import { TeachersComponent } from './teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { SharedroutingModule } from 'src/app/cts/shared/sharedrouting/sharedrouting.module';


@NgModule({
  declarations: [TeachersComponent,AddTeacherComponent],
  imports: [
    //common import for every child/feature module
    FormsModule,    
    ReactiveFormsModule,  

    
    TeachersRoutingModule,
    SharedroutingModule
  ]
})
export class TeachersModule { }
