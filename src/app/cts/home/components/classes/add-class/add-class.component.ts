import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { Paginationutil } from 'src/app/cts/shared/models/paginationutil';
import { Utility } from 'src/app/cts/shared/models/utility';
import { ClassesService } from 'src/app/cts/shared/services/classes.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {
  [x: string]: any;
  classId: string;
  formType: string;
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  addClassForm: FormGroup;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  editData: any;
  sections: SelectItem[] = [];



  constructor(private ClassesService: ClassesService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.sections = [
      { label: '1-section', value: 1 },
      { label: '2-sections', value: 2 },
      { label: '2-sections', value: 3 }

    ];
  }

  ngOnInit(): void {
    //to read url parameters
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.classId = window.atob(params['id']);
      this.formType = window.atob(params['type']);
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Class";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Class";
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
    this.addClassForm = this.fb.group({
      'class': new FormControl('', { validators: [Validators.required] }),
      'section': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditClassDetails();
  }
  bindEditClassDetails() {

    let pagingData = new Utility();
    pagingData = JSON.parse(Paginationutil.getDefaultFilter());
    pagingData.idValue = this.classId;
    //Get Classes API call
    this.ClassesService.getClasses(pagingData)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.success) {
          this.editData = result.data[0];
          this.addClassForm.setValue({
            'class': this.editData.name,
            'section': this.editData.noofsections
          })
        }
      });
      
    
  }







  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Class";
  }

  addClassSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addClassForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addClassForm.value);
      this.addClassForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }

  resetForm(): void {
    this.addClassForm.reset();
    this.successMessage = "";
  }

  list(): void {
    this.location.back();
  }

}


