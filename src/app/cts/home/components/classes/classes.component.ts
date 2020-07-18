import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Classes } from 'src/app/cts/shared/models/classes';
import { ClassesService } from 'src/app/cts/shared/services/classes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: Classes[];
  classes: Classes[];
  totalRecords: number;
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  loading: boolean;
  display:boolean=false;
  position: string;
  filtersForm: FormGroup;
  sections: SelectItem[] = [];

  constructor(private classesService: ClassesService, private router: Router, private route: ActivatedRoute,private fb: FormBuilder) {
    this.classes = [];
    this.sections = [
      { label: '1-section', value: '1' },
      { label: '2-sections', value: '2' }
    ];
  }

  public ngOnInit() {
    this.classesService.getClasses();
    this.classesService.classesJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(classes => {
      this.datasource = classes;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'noofsections', header: 'No.of Sections' },
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
        this.classes = this.datasource.slice(event.first, (event.first + event.rows));
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
    this.router.navigate(['add-class'], { relativeTo: this.route, queryParams: { type: window.btoa('create'),id: window.btoa(id) } });
  }
  editClass(id):void{
    this.router.navigate(['add-class'],{relativeTo: this.route,queryParams: { type: window.btoa('edit'), id: window.btoa(id) }});
  }
  viewClass(id):void{
    this.router.navigate(['add-class'],{relativeTo: this.route,queryParams: { type: window.btoa('view'), id: window.btoa(id) }});
  }
  deleteClass(id):void{
    this.position="top";
    this.display=true;
  }
  classRevoke():void{
    this.display=false;
  }
 //Filters code starts from here
   //Create form method to constuct a form with validations
   createFilterForm() {
    this.filtersForm = this.fb.group({
      'tclass': new FormControl(''),
      'tsection': new FormControl('')
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

