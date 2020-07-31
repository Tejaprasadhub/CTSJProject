import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Teachers } from 'src/app/cts/shared/models/teachers';
import { TeachersService } from 'src/app/cts/shared/services/teachers.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Paginationutil } from 'src/app/cts/shared/models/paginationutil';

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
  display: boolean = false;
  position: string;
  errorMessage: string = "";
  successMessage: string = "";
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

  //pagination and api integration starts from here
  numberOfPages: number = 10;
  totalcount: number = 0;
  noOfItems = 10;
  advancedFilterValue: string = "";
  currentPage: number = 1;
  pageCount: number;


  constructor(private teachersService: TeachersService, private router: Router, private route: ActivatedRoute,
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
  public ngOnInit() {
    // this.teachersService.getTeachers();
    // this.teachersService.teachersJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(teachers => {
    //   this.datasource = teachers;
    //   this.totalRecords = this.datasource.length;
    // });
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
  //Search box toggling
  toggleClass($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }
  //Api Integration Starts from here
  onPageChange(event: LazyLoadEvent) {
    let pageObject = Paginationutil.getGridFilters(event, this.advancedFilterValue);

    this.currentPage = pageObject.currentPage;

    let isinitialload = this.pageCount == undefined || this.pageCount == null;
    this.pageCount = pageObject.pageCount;

    let currentrows = event.rows * pageObject.pageNo;

    if (this.totalcount != 0) {
      this.noOfItems = (currentrows < this.totalcount ? currentrows : this.totalcount);
    }

    this.loadGrids(JSON.stringify(pageObject));
  }

  loadGrids(pagingData) {
    let paging = JSON.parse(pagingData);
    //Get Branches API call
    this.teachersService.getTeachers(pagingData)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.success) {
          this.teachers = result.data;
          //pagination starts from here
          this.totalcount = parseInt(result.total);

          if (this.totalcount <= paging.pageSize) {
            this.noOfItems = this.totalcount;
          } else {
            this.noOfItems = (JSON.parse(pagingData)).pageSize;
          }

          if (this.teachers != null && this.teachers != undefined) {
            this.teachers = this.teachers.map(function (el, i) {
              var o = Object.assign({}, el);
              o.indexId = i;
              return o;
            });
          }
          let currentrows = (this.currentPage * this.numberOfPages);
        }
      });
  }
  //API Integration ends here
  //Crud events
  addNew($event: any) {
    let id = "0";
    this.router.navigate(['add-teacher'], { relativeTo: this.route, queryParams: { type: window.btoa('create'), id: window.btoa(id) } });
  }
  editTeacher(id): void {
    this.router.navigate(['add-teacher'], { relativeTo: this.route, queryParams: { type: window.btoa('edit'), id: window.btoa(id) } });
  }
  viewTeacher(id): void {
    this.router.navigate(['add-teacher'], { relativeTo: this.route, queryParams: { type: window.btoa('view'), id: window.btoa(id) } });
  }
  deleteTeacher(id): void {
    this.position = "top";
    this.display = true;
    this.successMessage = "";
  }
  teacherRevoke(): void {
    this.display = false;
    this.successMessage = "Teacher deleted successfully"
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
