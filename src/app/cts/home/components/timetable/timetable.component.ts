import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Timetable } from 'src/app/cts/shared/models/timetable';
import { TimetableService } from 'src/app/cts/shared/services/timetable.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: Timetable[];
  timetable: Timetable[];
  totalRecords: number;
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  loading: boolean;
  errorMessage:string="";
  successMessage:string="";
  display:boolean=false;
  position: string;
  filtersForm: FormGroup;
  classid: any[];
  subjectid: any[];
  teacherid: any[];

  constructor(private timetableService: TimetableService, private router: Router,private route:ActivatedRoute,private fb: FormBuilder) {
    this.classid = [
      { label: 'class1', value: '1' },
      { label: 'class2', value: '2' },
      { label: 'class3', value: '3' }
    ];
    this.subjectid = [
      { label: 'subject1', value: '1' },
      { label: 'subject2', value: '2' },
      { label: 'subject3', value: '3' }
    ];
    this.teacherid = [
      { label: 'teacher1', value: '1' },
      { label: 'teacher2', value: '2' },
      { label: 'teacher3', value: '3' }
    ];
    this.timetable = [];
  }

  public ngOnInit() {
    this.timetableService.getTimetable();
    this.timetableService.timetableJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(timetable => {
      this.datasource = timetable;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'classid', header: 'Class Id' },
      { field: 'subjectid', header: 'Subject Id' },
      { field: 'teacherid', header: 'Teacher Id' },
      { field: 'periodfrom', header: 'Period From' },
      { field: 'periodto', header: 'Period To' },
      { field: 'createddate', header: 'Created Date' },
      { field: 'createdby', header: 'Created By' }
    ];
    this.loading = true;
    //to create form with validations
    this.createFilterForm();
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        this.timetable = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }
 
  toggleClass($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }

 //Crud events
 addNew($event: any) {
  let id="0";
  this.router.navigate(['add-timetable'], { relativeTo: this.route, queryParams: { type: window.btoa('create'),id: window.btoa(id) } });
}
editTimetable(id):void{
  this.router.navigate(['add-timetable'],{relativeTo: this.route,queryParams: { type: window.btoa('edit'), id: window.btoa(id) }});
}
viewTimetable(id):void{
  this.router.navigate(['add-timetable'],{relativeTo: this.route,queryParams: { type: window.btoa('view'), id: window.btoa(id) }});
}
  deleteTimetable(id):void{
    this.position="top";
    this.display=true;
    this.successMessage="";
  }
  timetableRevoke():void{
    this.display=false;
    this.successMessage="Timetable deleted successfully"
  }

  //Filters code starts from here
   //Create form method to constuct a form with validations
  createFilterForm() {
    this.filtersForm = this.fb.group({
      'tclassid': new FormControl(''),
      'tsubjectid': new FormControl(''),
      'tteaherid': new FormControl(''),
      'tperiodfrom': new FormControl(''),
      'tperiodto': new FormControl('')
    });
  }
  filterSubmit(): void {
    console.log(this.filtersForm.value);
  }
  //Reset form method
  resetFilterForm(): void {
    this.filtersForm.reset();
    console.log(this.filtersForm.value);
  }
}
