import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Addauditlog } from 'src/app/cts/shared/models/addauditlog';
import { AddauditlogService } from 'src/app/cts/shared/services/addauditlog.service';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-add-auditlog',
  templateUrl: './add-auditlog.component.html',
  styleUrls: ['./add-auditlog.component.scss']
})
export class AddAuditlogComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  addauditlog: Addauditlog[];
  datasource: Addauditlog[];
  totalRecords: number;
  filtersForm: FormGroup;
  actions: any[];
  users: any[];
  cols: any[];
  loading: boolean;
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;

  constructor(private fb: FormBuilder,private addauditlogService: AddauditlogService) {
    this.actions = [
      { label: 'Insert', value: 'Insert' },
      { label: 'Delete', value: 'Delete' },
      { label: 'Update', value: 'Update' }
    ];
    this.users = [
      { label: 'Admin', value: 'ADMN' },
      { label: 'Operator', value: 'OPTR' },
      { label: 'Teacher', value: 'TCHR' }
    ];
   }
   toggleClass($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
    this.myFiltersDiv.nativeElement.classList.remove('transform-active')
  else
    this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }
  ngOnInit(): void {
    this.addauditlogService.getAddauditlog();
    this.addauditlogService.addauditlogJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(Addauditlog => {
      this.datasource = Addauditlog;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'fieldname', header: 'Fieldname' },
      { field: 'action', header: 'Action' },
      { field: 'oldvalue', header: 'Oldvalue ' },
      { field: 'newvalue', header: 'Newvalue' },
      { field: 'user', header: 'User' }
    ];
    this.loading = true;

    //to create form with validations
    this.createFilterForm();
    this.createFilterForm();
  }
  createFilterForm() {
    this.filtersForm = this.fb.group({
      'fieldname': new FormControl(''),
      'oldvalue': new FormControl(''),
      'newvalue': new FormControl(''),
      'processeduser': new FormControl(''),
      'fromdate': new FormControl(''),
      'todate': new FormControl(''),
      'action': new FormControl(''),
    });
  }
  resetForm(): void {
    this.filtersForm.reset();
  }
  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        this.addauditlog = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

}
