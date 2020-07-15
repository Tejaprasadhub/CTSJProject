// 

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Users } from 'src/app/cts/shared/models/users';
import { UsersService } from 'src/app/cts/shared/services/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  datasource: Users[];
  users: Users[];
  totalRecords: number;
  cols: any[];
  display:boolean=false;
  position: string;
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  usertypes: any[];
  experience: any[];
  loading: boolean;
  status:any;
  filtersForm: FormGroup;

  constructor(private usersService: UsersService, private router: Router,private route:ActivatedRoute, private fb: FormBuilder) {
    this.usertypes = [
      { label: 'Admin', value: 'ADMN' },
      { label: 'DataEntryOperator', value: 'DEOR' },
      { label: 'Teacher', value: 'TCHR' }
    ];
    this.status = [
      { label: 'Active', value: 'AC' },
      { label: 'InActive', value: 'NA' },
    ];
    this.users = []
  }









  toggleClass($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }
  addNew($event:any){
    // this.router.navigateByUrl("Users/add-user");
    this.router.navigate(['add-user'], {relativeTo: this.route,queryParams: { type: 'create'}});
  }
  editUser():void{
    // this.router.navigateByUrl("Users/add-teacher?type=edit&id=1");
    this.router.navigate(['add-user'],{relativeTo: this.route,queryParams: { type: 'edit', id: '1' }});
  }
  deleteUser():void{
    this.position="top";
    this.display=true;
  }
  userRevoke():void{
    this.display=false;
  }

  public ngOnInit() {
    this.usersService.getUsers();
    this.usersService.usersJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(users => {
      this.datasource = users;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'usertype', header: 'User Type' },
      { field: 'username', header: 'User Name' },
      { field: 'displayname', header: 'Display Name' },
      { field: 'password', header: 'Password' },
      { field: 'userstatus', header: 'User Status' }
    ];
    this.loading = true;
    this.createFilterForm();
  }
  createFilterForm() {
    this.filtersForm = this.fb.group({
      'tusertype': new FormControl(''),
      'tuserName': new FormControl(''),
      'tuserstatus':new FormControl('')     
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

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        this.users = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }
}
