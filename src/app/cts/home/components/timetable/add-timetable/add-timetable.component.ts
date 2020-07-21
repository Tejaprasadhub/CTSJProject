import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.scss']
})
export class AddTimetableComponent implements OnInit {
  timetableId: string;
  formType: string;
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  addTimetableForm: FormGroup;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  editData: any;
  classid: any[];
  subjectid: any[];
  teacherid: any[];


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.classid = [
      { label: 'class1', value: '1' },
      { label: 'class2', value: '2' },
      { label: 'class3', value: '3' }
    ];
    this.subjectid = [
      { label: 'subject1', value: '1' },
      { label: 'subject2', value: '2' },
      { label: 'subject3', value: '3' }
    ];
    this.teacherid = [
      { label: 'teacher1', value: '1' },
      { label: 'teacher2', value: '2' },
      { label: 'teacher3', value: '3' }
    ];
  }

  ngOnInit(): void {// On page load
    //to read url parameters
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.timetableId = window.atob(params['id']);
      this.formType = window.atob(params['type']);
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Timetable";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Timetable";
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
    this.addTimetableForm = this.fb.group({
      'classid': new FormControl('', { validators: [Validators.required] }),
      'subjectid': new FormControl('', { validators: [Validators.required] }),
      'teacherid': new FormControl('', { validators: [Validators.required] }),
      'periodfrom': new FormControl('', { validators: [Validators.required] }),
      'periodto': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditTimetableDetails();
  }
  bindEditTimetableDetails() {
    this.editData = {
      'classid': '1',
      'subjectid': '1',
      'teacherid': '1',
      'periodfrom': '11/02/2001 00:00',
      'periodto': '11/02/2001 00:00',

    }
    this.addTimetableForm.setValue({
      'classid': this.editData.classid,
      'subjectid': this.editData.subjectid,
      'teacherid': this.editData.teacherid,
      'periodfrom': this.editData.periodfrom,
      'periodto': this.editData.periodto

    })
  }







  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Timetable";
  }

  addTimetableSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addTimetableForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addTimetableForm.value);
      this.addTimetableForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }

  resetForm(): void {
    this.addTimetableForm.reset();
    this.successMessage = "";
  }

  list(): void {
    this.location.back();
  }

}
