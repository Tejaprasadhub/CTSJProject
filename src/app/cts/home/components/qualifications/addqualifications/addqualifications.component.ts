import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addqualifications',
  templateUrl: './addqualifications.component.html',
  styleUrls: ['./addqualifications.component.scss']
})
export class AddQualificationComponent implements OnInit {
  qualificationId: string;
  formType: string;
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  addQualificationForm: FormGroup;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  editData: any;

  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {// On page load
    //to read url parameters
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.qualificationId = window.atob(params['id']);
      this.formType = window.atob(params['type']);
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Qualification";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Qualification";
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
    this.addQualificationForm = this.fb.group({
      'code': new FormControl('', { validators: [Validators.required] }),
      'title': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditQualificationDetails();
  }
  bindEditQualificationDetails() {
    this.editData = {
      'code': 'BTECH',
      'title': 'Btech'
    }
    this.addQualificationForm.setValue({
      'code': this.editData.code,
      'title': this.editData.title
    })
  }







  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Qualification";
  }

  addQualificationSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addQualificationForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addQualificationForm.value);
      this.addQualificationForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }

  resetForm(): void {
    this.addQualificationForm.reset();
    this.successMessage = "";
  }

  list(): void {
    this.location.back();
  }

}
