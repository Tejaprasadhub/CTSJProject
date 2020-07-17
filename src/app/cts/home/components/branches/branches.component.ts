import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Branches } from 'src/app/cts/shared/models/branches';
import { BranchesService } from 'src/app/cts/shared/services/branches.service';
import { Subject } from 'rxjs';
import { map,takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  branches: Branches[];
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  display:boolean=false;
  position: string;
  filtersForm: FormGroup;

  numberOfPages:number =10;
  totalcount:number=0;

  constructor(private BranchesService: BranchesService, private router: Router, private route: ActivatedRoute,private fb: FormBuilder) {
    this.branches = [];
   }

  ngOnInit(): void {
    //Get Branches API call
    this.BranchesService.getBranches()
    .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result =>{  
      this.branches= result;
      this.totalcount = parseInt(result.length);
      
    });
    //Table headers and fields
    this.cols = [
      { field: 'title', header: 'title' },
      { field: 'code', header: 'code' },
      { field: 'createddate', header: 'Created Date' },
      { field: 'createdby', header: 'Created By' }
    ];
     //to create form with validations
     this.createFilterForm();
  }
  //Search box toggling
  toggleBranch($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }
  //Crud events
  addNew($event: any) {
    let id="0";
    this.router.navigate(['add-branch'], { relativeTo: this.route, queryParams: { type: window.btoa('create'),id: window.btoa(id) } });
  }
  editBranch(id):void{
    this.router.navigate(['add-branch'],{relativeTo: this.route,queryParams: { type: window.btoa('edit'), id: window.btoa(id) }});
  }
  viewBranch(id):void{
    this.router.navigate(['add-branch'],{relativeTo: this.route,queryParams: { type: window.btoa('view'), id: window.btoa(id) }});
  }
  deleteBranch(id):void{
    this.position="top";
    this.display=true;
  }
  branchRevoke():void{
    this.display=false;
  }
 //Filters code starts from here
   //Construct Filter Form
   createFilterForm() {
    this.filtersForm = this.fb.group({
      'ttitle': new FormControl(''),
      'tcode': new FormControl('')     
    });
  }
  //Filter Submit method
  filterSubmit(): void {
    console.log(this.filtersForm.value);
  }
  //Filter Reset method
  resetFilterForm(): void {
    this.filtersForm.reset();
    console.log(this.filtersForm.value);
  } 
}
