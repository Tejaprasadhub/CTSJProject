import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  newsId: string;
  formType: string;
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  addNewsForm: FormGroup;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  editData: any;
  branchids: SelectItem[] = [];



  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.branchids = [
      { label: 'skota', value: '1' },
      { label: 'boddam', value: '2' }
    ];
  }

  ngOnInit(): void {
   //to read url parameters
   this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
    this.newsId = window.atob(params['id']);
    this.formType = window.atob(params['type']);
  });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add News";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit News";
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
    this.addNewsForm = this.fb.group({
      'title': new FormControl('', { validators: [Validators.required] }),
      'branchid': new FormControl('', { validators: [Validators.required] }),
      'description': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditNewsDetails();
  }
  bindEditNewsDetails() {
    this.editData = {
      'title': 'acheivment',
      'branchid': '1',
      'description': 'he achieved something'
    }
    this.addNewsForm.setValue({
      'title': this.editData.title,
      'branchid': this.editData.branchid,
      'description': this.editData.description
    })
  }







  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit News";
  }

  addNewsSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addNewsForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addNewsForm.value);
      this.addNewsForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }

  resetForm(): void {
    this.addNewsForm.reset();
    this.successMessage = "";
  }

  list(): void {
    this.location.back();
  }

} 


