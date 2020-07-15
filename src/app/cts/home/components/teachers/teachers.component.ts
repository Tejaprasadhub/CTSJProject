import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Teachers } from 'src/app/cts/shared/models/teachers';
import { TeachersService } from 'src/app/cts/shared/services/teachers.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
  expertise: any[];
  classes: any[];
  sections: any[];
  

  loading: boolean;
  //to create Teacher From 
  filtersForm: FormGroup;

  constructor(private teachersService: TeachersService, private router: Router,private route:ActivatedRoute,
    private fb: FormBuilder) {
      this.qualification = [
        { label: 'B.Ed', value: 'B.Ed' },
        { label: 'M.Ed', value: 'M.Ed' },
        { label: 'Other', value: 'OTH' }
      ];
      this.experience = [
        { label: '0-1(yrs)', value: '0-1' },
        { label: '15-20(yrs)', value: '15-20' },
        { label: '>20(yrs)', value: '>20' }
      ];
      this.expertise = [
        { label: 'Telugu', value: 'T' },
        { label: 'Hindi', value: 'H' },
        { label: 'English', value: 'E' },
        { label: 'Mathmatics', value: 'M' },
        { label: 'Science', value: 'S' }
      ];
      this.classes = [
        { label: '1st Class', value: '1' },
        { label: '2nd Class', value: '2' },
        { label: '3rd Class', value: '3' },
        { label: '4th Class', value: '4' },
        { label: '5th Class', value: '5' }
      ];
      this.sections = [
        { label: 'A Section', value: 'A' },
        { label: 'B Section', value: 'B' },
        { label: 'C Section', value: 'C' },
        { label: 'D Section', value: 'D' },
        { label: 'E Section', value: 'E' }
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
    this.router.navigate(['add-teacher'], {relativeTo: this.route,queryParams: { type: window.btoa('create')}});
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

    //to create form with validations
    this.createFilterForm();
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

  //Filters code starts from here
   //Create form method to constuct a form with validations
   createFilterForm() {
    this.filtersForm = this.fb.group({
      'tName': new FormControl(''),
      'tQualification': new FormControl(''),
      'tDateOfBirth': new FormControl(''),
      'tEmail': new FormControl(''),
      'tExperience': new FormControl(''),
      'tMobile': new FormControl(''),
      'tExpertise': new FormControl(''),
      'tClasses': new FormControl(''),
      'tSections': new FormControl('')
    });
  }

  // Add Teacher method
  filterSubmit(): void {
    console.log(this.filtersForm.value);
  }
  //Reset form method
  resetFilterForm(): void {
    this.filtersForm.reset();
    console.log(this.filtersForm.value);
  }
}
