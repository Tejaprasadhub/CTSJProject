import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from '../../home/components/students/students.component';
import { TeachersComponent } from '../../home/components/teachers/teachers.component';
import { UsersComponent } from '../../home/components/users/users.component';
import { ExamsComponent } from '../../home/components/exams/exams.component';
import { ClassesComponent } from '../../home/components/classes/classes.component';
import {SectionsComponent} from '../../home/components/sections/sections.component';
import { StudentlayoutComponent } from '../../home/components/students/studentlayout/studentlayout.component';
import { StudentdetailroutingModule } from '../../home/components/students/studentdetailrouting/studentdetailrouting.module';
import { AddTeacherComponent } from '../../home/components/teachers/add-teacher/add-teacher.component';
import { AddUserComponent } from '../../home/components/users/add-user/add-user.component';
import {AddExamComponent} from '../../home/components/exams/add-exam/add-exam.component';
import {ChangePasswordComponent} from '../../home/components/change-password/change-password.component';
import { DashboardComponent } from '../../home/components/dashboard/dashboard.component';
import { EventsComponent } from '../../home/components/events/events.component';
import { from } from 'rxjs';
import { AddEventComponent } from '../../home/components/events/add-event/add-event.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { AddStudentComponent } from '../components/students/add-student/add-student.component';
import { AddClassComponent } from '../components/classes/add-class/add-class.component';
import { AuthenticationGuardService } from 'src/app/core/security/authentication-guard.service';
import { BranchesComponent } from '../components/branches/branches.component';
import { AddBranchComponent } from '../components/branches/add-branch/add-branch.component';
import { NewsComponent } from '../components/news/news.component';
import { AddNewsComponent } from '../components/news/add-news/add-news.component';
import { AddAchievementComponent } from '../components/achievements/add-achievement/add-achievement.component';
import { AchievementsComponent } from '../components/achievements/achievements.component';



const homeRoutes: Routes = [
  {
    path:'admin',
    component:LayoutComponent,
    children:[
      {
        path: 'students',
        component: StudentsComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Students List' },
        children: [
          {
            path: 'student',
            component: StudentlayoutComponent,
            loadChildren: () => import('../components/students/studentdetailrouting/studentdetailrouting.module').then(m => m.StudentdetailroutingModule)
          }
        ]
      },
      {
        path: 'teachers',       
        loadChildren: () => import('../components/teachers/teachers.module').then(m => m.TeachersModule),
        // component: TeachersComponent,
        // data: { title: 'Teachers List' }
      },
      {
        path: 'students/add-student',
        component: AddStudentComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Add Student' }
      },
      {
        path: 'events',
        component: EventsComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Events List' }
      },
      {
        path: 'events/add-event',
        component: AddEventComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Add Event' }
      }, 
      {
        path: 'users',
        component: UsersComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Users List' }
      },
      {
        path: 'users/add-user',
        component: AddUserComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Users List' }
      },
      {
        path: 'branches',
        component: BranchesComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Users List' }
      },
      {
        path: 'branches/add-branch',
        component: AddBranchComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Users List' }
      },
      {
        path: 'news',
        component: NewsComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Users List' }
      },
      {
        path: 'news/add-news',
        component: AddNewsComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Users List' }
      },
      {
        path: 'achivements',
        component: AchievementsComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Users List' }
      },
      {
        path: 'achivements/add-achievement',
        component: AddAchievementComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Users List' }
      },
      {
        path: 'exams',
        component: ExamsComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Exams List' }
      },
      {
        path: 'exams/add-exam',
        component: AddExamComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Exams List' }
      },
      {
        path: 'classes',
        component: ClassesComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Classes List' }
      },
      {
        path: 'classes/add-class',
        component: AddClassComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Exams List' }
      },
      {
        path: 'sections',
        component: SectionsComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Sections List' }
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Change Password' }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthenticationGuardService],
        data: { title: 'Change Password' }
      }
    ]
  }
   
];
@NgModule({
  imports:[
    RouterModule.forChild(homeRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class HomeRoutingModule { }
