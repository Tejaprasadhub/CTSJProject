import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Subjects } from 'src/app/cts/shared/models/subjects';
import { SubjectsService } from 'src/app/cts/shared/services/subjects.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: Subjects[];
  subjects: Subjects[];
  totalRecords: number;
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  loading: boolean;
  errorMessage:string="";
  successMessage:string="";
  display:boolean=false;
  position: string;
  filtersForm: FormGroup;

  constructor(private subjectsService: SubjectsService, private router: Router,private route:ActivatedRoute,private fb: FormBuilder) {
    this.subjects = [];
  }

  public ngOnInit() {
    this.subjectsService.getSubjects();
    this.subjectsService.subjectsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(subjects => {
      this.datasource = subjects;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
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
        this.subjects = this.datasource.slice(event.first, (event.first + event.rows));
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
  this.router.navigate(['add-subject'], { relativeTo: this.route, queryParams: { type: window.btoa('create'),id: window.btoa(id) } });
}
editSubject(id):void{
  this.router.navigate(['add-subject'],{relativeTo: this.route,queryParams: { type: window.btoa('edit'), id: window.btoa(id) }});
}
viewSubject(id):void{
  this.router.navigate(['add-subject'],{relativeTo: this.route,queryParams: { type: window.btoa('view'), id: window.btoa(id) }});
}
  deleteSubject(id):void{
    this.position="top";
    this.display=true;
    this.successMessage="";
  }
  subjectRevoke():void{
    this.display=false;
    this.successMessage="Subject deleted successfully"
  }

  //Filters code starts from here
   //Create form method to constuct a form with validations
  createFilterForm() {
    this.filtersForm = this.fb.group({
      'tcode': new FormControl(''),
      'tname': new FormControl(''),
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
