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
 //Crud events
 addNew($event: any) {
  let id="0";
  this.router.navigate(['add-user'], { relativeTo: this.route, queryParams: { type: window.btoa('create'),id: window.btoa(id) } });
}
editUser(id):void{
  this.router.navigate(['add-user'],{relativeTo: this.route,queryParams: { type: window.btoa('edit'), id: window.btoa(id) }});
}
viewUser(id):void{
  this.router.navigate(['add-user'],{relativeTo: this.route,queryParams: { type: window.btoa('view'), id: window.btoa(id) }});
}
  deleteUser(id):void{
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
     //to create form with validations
    this.createFilterForm();
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
  //filter code starts from here
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

}
