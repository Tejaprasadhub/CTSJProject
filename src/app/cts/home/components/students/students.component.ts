import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Students } from 'src/app/cts/shared/models/students';
import { StudentsService } from 'src/app/cts/shared/services/students.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Gender, Class123 } from 'src/app/cts/shared/models/gender';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  datasource: Students[];

  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;

  students: Students[];

  totalRecords: number;

  cols: any[];
  sub: any;
  selectedColumns: any[];

  loading: boolean;
  display: boolean = false;
  position: string;
  errorMessage: string = "";
  successMessage: string = "";

  colors: SelectItem[];
  gender: Gender[];
  class: Class123[];

  constructor(private studentsService: StudentsService, private router: Router, private route: ActivatedRoute) {
    this.gender = [
      { name: 'Male', code: 'M' },
      { name: 'Female', code: 'F' }
    ];
    this.class = [
      { name: '1st Class', code: '1' },
      { name: '2nd class', code: '' }
    ];
  }
  toggleClass($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }
  public ngOnInit() {
    this.studentsService.getStudents();
    //  this.totalRecords = this.datasource.length;
    this.studentsService.studentsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(students => {
      this.datasource = students;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'firstname', header: 'Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'dob', header: 'Date Of Birth' },
      { field: 'email', header: 'Email' },
      { field: 'classs', header: 'Class' }
    ];
    this.loading = true;

    this.colors = [
      { label: 'White', value: 'White' },
      { label: 'Green', value: 'Green' },
      { label: 'Silver', value: 'Silver' },
      { label: 'Black', value: 'Black' },
      { label: 'Red', value: 'Red' },
      { label: 'Maroon', value: 'Maroon' },
      { label: 'Brown', value: 'Brown' },
      { label: 'Orange', value: 'Orange' },
      { label: 'Blue', value: 'Blue' }
    ];

    // FilterUtils['custom'] = (value, filter): boolean => {
    //     if (filter === undefined || filter === null || filter.trim() === '') {
    //         return true;
    //     }

    //     if (value === undefined || value === null) {
    //         return false;
    //     }

    //     return parseInt(filter) > value;
    // }
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      if (this.datasource) {
        this.students = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  rowExpand(event, data) {
    let naviagateURL = "";
    naviagateURL = "/admin/students/student";
    this.router.navigate([naviagateURL, { outlets: { detail: ['student-profile'] } }]);
  }

  addNew($event: any) {
    this.router.navigate(['add-student'], { relativeTo: this.route, queryParams: { type: 'create' } });
  }

  editStudent(): void {
    this.router.navigate(['add-student'], { relativeTo: this.route, queryParams: { type: 'edit', id: '1' } });
  }
  deleteStudent(): void {
    this.position = "top";
    this.display = true;
    this.successMessage = "";
  }
  studentRevoke(): void {
    this.display = false;
    this.successMessage = "Student deleted successfully"
  }

}
