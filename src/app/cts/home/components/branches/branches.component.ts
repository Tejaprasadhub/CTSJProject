import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Branches } from 'src/app/cts/shared/models/branches';
import { BranchesService } from 'src/app/cts/shared/services/branches.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: Branches[];
  branches: Branches[];
  totalRecords: number;
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  loading: boolean;
  display:boolean=false;
  position: string;
  filtersForm: FormGroup;

  constructor(private BranchesService: BranchesService, private router: Router, private route: ActivatedRoute,private fb: FormBuilder) {
    this.branches = [];
   }

  ngOnInit(): void {
    this.BranchesService.getBranches();
    this.BranchesService.branchesJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(Branches => {
      this.datasource = Branches;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'title', header: 'title' },
      { field: 'code', header: 'code' },
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
        this.branches = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
        console.log(this.branches)
      }
    }, 1000);
  }
  toggleBranch($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }
  addNew($event: any) {
    this.router.navigate(['add-branch'], { relativeTo: this.route, queryParams: { type: 'create' } });
  }
  editBranch():void{
    // this.router.navigateByUrl("Users/add-teacher?type=edit&id=1");
    this.router.navigate(['add-branch'],{relativeTo: this.route,queryParams: { type: 'edit', id: '1' }});
  }
  deleteBranch():void{
    this.position="top";
    this.display=true;
  }
  branchRevoke():void{
    this.display=false;
  }
 //Filters code starts from here
   //Create form method to constuct a form with validations
   createFilterForm() {
    this.filtersForm = this.fb.group({
      'ttitle': new FormControl(''),
      'tcode': new FormControl('')     
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
