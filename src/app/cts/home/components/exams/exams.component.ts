import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Exams } from 'src/app/cts/shared/models/exams';
import { ExamsService } from 'src/app/cts/shared/services/exams.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: Exams[];
  exams: Exams[];
  totalRecords: number;
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  loading: boolean;
  errorMessage:string="";
  successMessage:string="";
  display:boolean=false;
  position: string;
  filtersForm: FormGroup;

  constructor(private examsService: ExamsService, private router: Router,private route:ActivatedRoute,private fb: FormBuilder) {
    this.exams = [];
  }

  public ngOnInit() {
    this.examsService.getExams();
    this.examsService.examsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(exams => {
      this.datasource = exams;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'year', header: 'Year' },
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
        this.exams = this.datasource.slice(event.first, (event.first + event.rows));
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
  this.router.navigate(['add-exam'], { relativeTo: this.route, queryParams: { type: window.btoa('create'),id: window.btoa(id) } });
}
editExam(id):void{
  this.router.navigate(['add-exam'],{relativeTo: this.route,queryParams: { type: window.btoa('edit'), id: window.btoa(id) }});
}
viewExam(id):void{
  this.router.navigate(['add-exam'],{relativeTo: this.route,queryParams: { type: window.btoa('view'), id: window.btoa(id) }});
}
  deleteExam(id):void{
    this.position="top";
    this.display=true;
    this.successMessage="";
  }
  examRevoke():void{
    this.display=false;
    this.successMessage="Exam deleted successfully"
  }

  //Filters code starts from here
   //Create form method to constuct a form with validations
  createFilterForm() {
    this.filtersForm = this.fb.group({
      'ttitle': new FormControl(''),
      'tyear': new FormControl(''),
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
