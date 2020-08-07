import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { Utility } from 'src/app/cts/shared/models/utility';
import { Paginationutil } from 'src/app/cts/shared/models/paginationutil';
import { BranchesService } from 'src/app/cts/shared/services/branches.service';


@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {
  branchId: string;
  formType: string;
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  addBranchForm: FormGroup;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  editData: any;
  sections: SelectItem[] = []; 

  constructor(private BranchesService: BranchesService,private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private location: Location) { 
  }

  ngOnInit(): void {
    //to read url parameters
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.branchId = window.atob(params['id']);
      this.formType = window.atob(params['type']);
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Branch";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Branch";
      this.editControls();
      this.fetchData();
    } else {
      this.pageTitle = "View Details";
      this.isDisabled = true;
      this.isRequired = false;
      this.fetchData();
    }
  }
  createForm() {
    this.addBranchForm = this.fb.group({
      'code': new FormControl('', { validators: [Validators.required] }),
      'title': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditBranchDetails();
  }
  bindEditBranchDetails() {

    let pagingData = new Utility();
    pagingData = JSON.parse(Paginationutil.getDefaultFilter());
    pagingData.idValue = this.branchId;
    //Get Branches API call
    this.BranchesService.getBranches(pagingData)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.success) {
          this.editData = result.data[0];
          this.addBranchForm.setValue({
            'code': this.editData.code,
            'title': this.editData.title
          })
        }
      });
      
  }

  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Branch";
  }

  addBranchSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addBranchForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addBranchForm.value);
      this.addBranchForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }

  resetForm(): void {
    this.addBranchForm.reset();
    this.successMessage = "";
  }

  list(): void {
    this.location.back();
  }

  }

