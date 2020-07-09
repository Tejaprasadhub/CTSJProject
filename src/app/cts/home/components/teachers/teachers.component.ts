import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Teachers } from 'src/app/cts/shared/models/teachers';
import { TeachersService } from 'src/app/cts/shared/services/teachers.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  datasource: Teachers[];
  teachers: Teachers[];
  totalRecords: number;
  display:boolean=false;
  position: string;
  errorMessage:string="";
  successMessage:string="";
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  qualification: any[];
  experience: any[];
  loading: boolean;

  constructor(private teachersService: TeachersService, private router: Router,private route:ActivatedRoute) {
    this.qualification = [
      { name: 'B.Tech' },
      { name: 'B.Ed' },
      { name: 'B.sc' }
    ];
    this.experience = [
      { name: '0-1(yrs)' },
      { name: '1-2(yrs)' },
      { name: '2-3(yrs)' },
      { name: '3-4(yrs)' },
      { name: '4-5(yrs)' },
      { name: '5-6(yrs)' },
      { name: '6-7(yrs)' },
      { name: '7-8(yrs)' },
      { name: '8-9(yrs)' },
      { name: '9-10(yrs)' },
      { name: '10-12(yrs)' },
      { name: '12-15(yrs)' },
      { name: '15-20(yrs)' },
      { name: '>20(yrs)' }
    ];
    this.teachers = []
  }

  toggleClass($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }

  addNew($event:any){
    // this.router.navigateByUrl("Teachers/add-teacher?type=create");
    this.router.navigate(['add-teacher'], {relativeTo: this.route,queryParams: { type: 'create'}});
  }
  editTeacher():void{
    // this.router.navigateByUrl("Teachers/add-teacher?type=edit&id=1");
    this.router.navigate(['add-teacher'],{relativeTo: this.route,queryParams: { type: 'edit', id: '1' }});
  }
  deleteTeacher():void{
    this.position="top";
    this.display=true;
    this.successMessage=""; 
  }
  teacherRevoke():void{
    this.display=false;
    this.successMessage="Teacher deleted successfully"
  }
  public ngOnInit() {
    this.teachersService.getTeachers();
    this.teachersService.teachersJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(teachers => {
      this.datasource = teachers;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'teachername', header: 'Name' },
      { field: 'dob', header: 'DOB' },
      { field: 'qualification', header: 'Qualification' },
      { field: 'email', header: 'Email' },
      { field: 'mobilenumber', header: 'Mobile ' },
      { field: 'experience', header: 'Experience' },
      { field: 'expertise', header: 'Expertise' },
      { field: 'classes', header: 'Classes' },
      { field: 'sections', header: 'Sections' }
    ];
    this.loading = true;
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        this.teachers = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }
}
