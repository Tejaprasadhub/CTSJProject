import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {
  examId: string;
  formType: string;
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  addExamForm: FormGroup;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  editData: any;

  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {// On page load
    //to read url parameters
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.examId = window.atob(params['id']);
      this.formType = window.atob(params['type']);
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Exam";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Exam";
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
    this.addExamForm = this.fb.group({
      'title': new FormControl('', { validators: [Validators.required, Validators.pattern('^([A-Za-z0-9 _\'-])*$')] }),
      'year': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditExamDetails();
  }
  bindEditExamDetails() {
    this.editData = {
      'title': 'Ganeshchandra',
      'year': '02/2001'
    }
    this.addExamForm.setValue({
      'title': this.editData.title,
      'year': this.editData.year
    })
  }







  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Exam";
  }

  addExamSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addExamForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addExamForm.value);
      this.addExamForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }

  resetForm(): void {
    this.addExamForm.reset();
    this.successMessage = "";
  }

  list(): void {
    this.location.back();
  }

}
