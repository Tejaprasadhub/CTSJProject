import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.scss']
})
export class AddAchievementComponent implements OnInit {
  achievementId: string;
  formType: string;
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  addAchievementForm: FormGroup;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  editData: any;

  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {// On page load
    //to get the query parameter values
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.achievementId = params['id'];
      this.formType = params['type'];
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Achievement";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Achievement";
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
    this.addAchievementForm = this.fb.group({
      'title': new FormControl('', { validators: [Validators.required, Validators.pattern('^([A-Za-z0-9 _\'-])*$')] }),
      'date': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditAchievementDetails();
  }
  bindEditAchievementDetails() {
    this.editData = {
      'title': 'Ganeshchandra',
      'date': '02/27/2001'
    }
    this.addAchievementForm.setValue({
      'title': this.editData.title,
      'date': this.editData.date
    })
  }







  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Achievement";
  }

  addAchievementSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addAchievementForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addAchievementForm.value);
      this.addAchievementForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }

  resetForm(): void {
    this.addAchievementForm.reset();
    this.successMessage = "";
  }

  list(): void {
    this.location.back();
  }

}
