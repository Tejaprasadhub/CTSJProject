import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Qualifications } from 'src/app/cts/shared/models/qualifications';
import { QualificationsService } from 'src/app/cts/shared/services/qualifications.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss']
})
export class QualificationsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: Qualifications[];
  qualifications: Qualifications[];
  totalRecords: number;
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  loading: boolean;
  errorMessage:string="";
  successMessage:string="";
  display:boolean=false;
  position: string;
  filtersForm: FormGroup;

  constructor(private qualificationsService: QualificationsService, private router: Router,private route:ActivatedRoute,private fb: FormBuilder) {
    this.qualifications = [];
  }

  public ngOnInit() {
    this.qualificationsService.getQualifications();
    this.qualificationsService.qualificationsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(qualifications => {
      this.datasource = qualifications;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'title', header: 'Title' },
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
        this.qualifications = this.datasource.slice(event.first, (event.first + event.rows));
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
  this.router.navigate(['add-qualification'], { relativeTo: this.route, queryParams: { type: window.btoa('create'),id: window.btoa(id) } });
}
editQualification(id):void{
  this.router.navigate(['add-qualification'],{relativeTo: this.route,queryParams: { type: window.btoa('edit'), id: window.btoa(id) }});
}
viewQualification(id):void{
  this.router.navigate(['add-qualification'],{relativeTo: this.route,queryParams: { type: window.btoa('view'), id: window.btoa(id) }});
}
  deleteQualification(id):void{
    this.position="top";
    this.display=true;
    this.successMessage="";
  }
  qualificationRevoke():void{
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
