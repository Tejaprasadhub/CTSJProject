import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/cts/shared/models/users';
// import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Utility } from 'src/app/cts/shared/models/utility';
import { Paginationutil } from 'src/app/cts/shared/models/paginationutil';
import { UsersService } from 'src/app/cts/shared/services/users.service';
import { AppConstants } from 'src/app/cts/app-constants';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: Users[];
  usertypes: any;
  status:any;
  id:any;
  private ngUnsubscribe = new Subject();
  userId: number;
  formType: string;
  editData: any;
  pageTitle: string;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  successMessage:string="";
  errorMessage: string = "";
  querytype:number;

  //to create Teacher From 
  addUserForm: FormGroup;
  formSubmitAttempt: boolean = false;
  constructor(private UsersService: UsersService,private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.usertypes = [
      { label: 'Admin', value: 'ADMN' },
      { label: 'DataEntryOperator', value: 'DEOR' },
      { label: 'Teacher', value: 'TCHR' }
    ];
    this.status = [
      { label: 'Active', value: 'AC' },
      { label: 'InActive', value: 'NA' },
    ];
    this.id = [
      { label: 'branch1', value: '1' },
      { label: 'branch2', value: '2' },
      { label: 'branch3', value: '3' },
    ];
    }

  ngOnInit(): void {
     //to read url parameters
     this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.userId = Number(window.atob(params['id']));
      this.formType = window.atob(params['type']);
    });

    this.createForm();
    if (this.formType == "create") {
      this.pageTitle = "Add User";
      this.isDisabled = false;
      this.isRequired = true;
      this.querytype=1;
    }
    else if (this.formType == "edit") {
      this.pageTitle = "Edit User";
      this.editControls();
      this.fetchData();
      this.querytype=2;
    }
    else {
      this.pageTitle = "View Details";
      this.isDisabled = true;
      this.isRequired = false;
      this.fetchData();
      this.querytype=2;
    }




  }

  createForm() {
    this.addUserForm = this.fb.group({
      'usertype': new FormControl('', { validators: [Validators.required] }),
      'branchid':new FormControl('', { validators: [Validators.required] }),
      'userName': new FormControl('', { validators: [Validators.required, Validators.pattern('^([A-Za-z0-9 _\'-])*$')] }),
      'userstatus':new FormControl('', { validators: [Validators.required] }),
      'dispName': new FormControl('', { validators: [Validators.required, Validators.pattern('^([A-Za-z0-9 _\'-])*$')] }),
      'password': new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]
      })

    });
  }


  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditUserDetails();
  }
  bindEditUserDetails() {
    let pagingData = new Utility();
    pagingData = JSON.parse(Paginationutil.getDefaultFilter());
    pagingData.idValue = this.userId.toString();
    //Get Branches API call
    this.UsersService.getUsers(pagingData)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.success) {
          this.editData = result.data[0];
          this.addUserForm.setValue({
            'usertype': this.editData.usertype,
            'userName': this.editData.username,
            'dispName': this.editData.displayname,
            'branchid': this.editData.branchtitle,
            'userstatus': this.editData.userstatus,
            'password': ''
          })
        }
      });
  }


  addUserSubmit(): void {
    // this.formSubmitAttempt = true;
    // this.successMessage="";
    // if(this.addUserForm.valid){
    //   this.formSubmitAttempt=false;
    // this.addUserForm.reset();     
    //   this.successMessage="Your changes have been successfully saved";
    // }
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addUserForm.valid) {
      this.formSubmitAttempt = false;
      let customObj = new Users();
      customObj = this.addUserForm.value;
      customObj.id = this.userId;
      customObj.querytype = this.querytype;
debugger
      //AED Branches API call
      this.UsersService.AEDUsers(customObj)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
          if (result.success) {
            // this.branches= result.data;    
            if (this.formType == "create") {
            this.addUserForm.reset();
            }
            this.successMessage = AppConstants.Messages.successMessage;
          }else{
            this.errorMessage = "Usertype already exists";
          }
        },
        error =>{  
          this.router.navigate(['/admin/app-error'], {  queryParams: { message: window.btoa(error.message)} });     
        });
    }
  }
  resetForm(): void {
    this.addUserForm.reset();
    this.successMessage="";
  }
  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit User";
  }
  list(): void {
    // this.router.navigateByUrl("Teachers");
    this.location.back();
    // this.router.navigate(['/Teachers'], {relativeTo: this.route});
  }
  
}
