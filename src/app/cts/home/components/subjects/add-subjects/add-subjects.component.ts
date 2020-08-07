import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { SubjectsService } from 'src/app/cts/shared/services/subjects.service';
import { Utility } from 'src/app/cts/shared/models/utility';
import { Paginationutil } from 'src/app/cts/shared/models/paginationutil';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.scss']
})
export class AddSubjectsComponent implements OnInit {

  subjectId: string;
  formType: string;
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  addSubjectForm: FormGroup;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  editData: any;

  
  constructor(private SubjectsService: SubjectsService,private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {// On page load
    //to read url parameters
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.subjectId = window.atob(params['id']);
      this.formType = window.atob(params['type']);
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Subject";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Subject";
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
    this.addSubjectForm = this.fb.group({
      'code': new FormControl('', { validators: [Validators.required] }),
      'name': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditSubjectDetails();
  }
  bindEditSubjectDetails() {
    let pagingData = new Utility();
    pagingData = JSON.parse(Paginationutil.getDefaultFilter());
    pagingData.idValue = this.subjectId;
    //Get Branches API call
    this.SubjectsService.getSubjects(pagingData)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.success) {
          this.editData = result.data[0];
          this.addSubjectForm.setValue({
            'code': this.editData.code,
            'name': this.editData.name
          })
        }
      });
  }







  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Subject";
  }

  addSubjectSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addSubjectForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addSubjectForm.value);
      this.addSubjectForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }

  resetForm(): void {
    this.addSubjectForm.reset();
    this.successMessage = "";
  }

  list(): void {
    this.location.back();
  }

}


