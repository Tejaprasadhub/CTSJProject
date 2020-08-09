import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Teachers } from 'src/app/cts/shared/models/teachers';
import { TeachersService } from 'src/app/cts/shared/services/teachers.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Paginationutil } from 'src/app/cts/shared/models/paginationutil';
import { Table } from 'primeng/table';
import { multiselectObject } from 'src/app/cts/shared/models/multi-select-object';
import { DropdownService } from 'src/app/cts/shared/services/dropdown.service';
import * as moment from 'moment';

// import * as angular from "angular";


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
  qualifications: any[];
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
  multiSelectFilterValue: string = "";
  currentPage: number = 1;
  pageCount: number;
  rowDataString: string = "";
  selectedArray: Array<multiselectObject> = [];
  @ViewChild(Table, { static: false }) DataTable: Table;


  constructor(private dropdownService: DropdownService,private teachersService: TeachersService, private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder) {
       //Get Dropdowns API call
     var dropdowns = ["subjects","classes","qualifications","sections","experiences"];
     this.dropdownService.getDropdowns(dropdowns)
     .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
       if (result.success) {
        this.expertise = result.data.subjects;
        this.classes = result.data.classes;
        this.qualifications = result.data.qualifications;
        this.sections = result.data.sections;
        this.experience = result.data.experiences;
       }
     });  
   
  
    this.teachers = []
  }
  public ngOnInit() {
    this.cols = [
      { field: 'teachername', header: 'Name' },
      { field: 'dob', header: 'DOB' },
      { field: 'qualifications', header: 'Qualifications' },
      { field: 'email', header: 'Email' },
      { field: 'mobilenumber', header: 'Mobile ' },
      { field: 'experience', header: 'Experience(Yrs)' },
      { field: 'subjects', header: 'Subjects' },
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
    let pageObject = Paginationutil.getGridFilters(event, this.multiSelectFilterValue);

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

  multiselectSearch(event, from) {  
    //creating new object   
    let customObj = new multiselectObject();
    customObj.key = from;
    customObj.value = event.itemValue;

    //if object is exists in array then remove object from else push object into array
    var find = false;
    for (let item of this.selectedArray) {
      // same smallItem value
      if (item.value == customObj.value) {
        find = true;
      }
    }
    if (!find) {
      this.selectedArray.push(customObj);
    } else {
      this.selectedArray = this.selectedArray.filter(obj => obj.value !== customObj.value)
    }

    //to create fileter stirng for multiselect
    this.multiSelectFilterValue = this.selectedArray.map(object => {
      let comparison = `'${object.value}'`;
      return `(${object.key}=${comparison})`
    }).join(' OR ')

    //calling get method with multiselect filters
    let totalFilter = Paginationutil.getGridFilters(this.DataTable, this.multiSelectFilterValue)
    this.loadGrids(JSON.stringify(totalFilter));
    
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
  //to get date format
  getFormat(createddate):string{
    return moment(createddate).format(Paginationutil.getDefaultFormat())
   }

}
