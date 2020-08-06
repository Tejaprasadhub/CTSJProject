import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Qualifications } from 'src/app/cts/shared/models/qualifications';
import { QualificationsService } from 'src/app/cts/shared/services/qualifications.service';
import { Subject } from 'rxjs';
import { map,takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Paginationutil } from 'src/app/cts/shared/models/paginationutil';


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
  //pagination and api integration starts from here
  numberOfPages:number =10;
  totalcount:number=0;
  noOfItems=10;
  advancedFilterValue:string ="";
  currentPage:number = 1;
  pageCount:number;

  constructor(private QualificationsService: QualificationsService, private router: Router,private route:ActivatedRoute,private fb: FormBuilder) {
    this.qualifications = [];
  }

  public ngOnInit() {

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

 
 
  toggleClass($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }

  //Api Integration Starts from here
  onPageChange(event:LazyLoadEvent){
    let pageObject = Paginationutil.getGridFilters(event,this.advancedFilterValue);

    this.currentPage = pageObject.currentPage;

    let isinitialload = this.pageCount == undefined || this.pageCount == null;
    this.pageCount = pageObject.pageCount;

    let currentrows = event.rows * pageObject.pageNo;

    if(this.totalcount != 0){
      this.noOfItems =(currentrows < this.totalcount ? currentrows : this.totalcount);
    }

    this.loadGrids(JSON.stringify(pageObject));

  }

  loadGrids(pagingData){
    let paging = JSON.parse(pagingData);
    //Get Branches API call
    this.QualificationsService.getQualifications(pagingData)
    .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result =>{  
      if(result.success){
      this.qualifications= result.data;
      //pagination starts from here
      this.totalcount = parseInt(result.total);    

      if(this.totalcount <= paging.pageSize){
        this.noOfItems = this.totalcount;
      }else{
        this.noOfItems = (JSON.parse(pagingData)).pageSize;
      }

      if(this.qualifications != null && this.qualifications != undefined){
        this.qualifications = this.qualifications.map(function(el,i){
          var o = Object.assign({},el);
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