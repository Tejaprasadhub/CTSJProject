import { Component, OnInit } from '@angular/core';
import { Auditlogs } from 'src/app/cts/shared/models/auditlogs';
import { AuditlogsService } from 'src/app/cts/shared/services/auditlogs.service';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auditlogs',
  templateUrl: './auditlogs.component.html',
  styleUrls: ['./auditlogs.component.scss']
})
export class AuditlogsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: Auditlogs[];
  auditlogs: Auditlogs[];
  totalRecords: number;
  cols: any[];
  loading: boolean;

  constructor(private auditlogsService: AuditlogsService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.auditlogsService.getAuditlogs();
    //  this.totalRecords = this.datasource.length;
    this.auditlogsService.auditlogsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(auditlogs => {
      this.datasource = auditlogs;
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
        this.auditlogs = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }
  rowExpand(event, data) {
    this.router.navigate(['add-auditlog'], { relativeTo: this.route });
  }

}
