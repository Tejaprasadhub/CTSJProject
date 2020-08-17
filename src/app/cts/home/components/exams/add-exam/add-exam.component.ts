import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamsService } from 'src/app/cts/shared/services/exams.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { Utility } from 'src/app/cts/shared/models/utility';
import { Paginationutil } from 'src/app/cts/shared/models/paginationutil';
import { Exams } from 'src/app/cts/shared/models/exams';
import { AppConstants } from 'src/app/cts/app-constants';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {
  examId: number;
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
  querytype:number;
  status: SelectItem[] = [];

  
  constructor(private ExamsService: ExamsService,private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private location: Location) { 
    this.status = [
      { label: 'Active', value: 'AC' },
      { label: 'InActive', value: 'NA' }
    ];
  }

  ngOnInit(): void {// On page load
    //to read url parameters
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.examId = Number(window.atob(params['id']));
      this.formType = window.atob(params['type']);
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Exam";
      this.isDisabled = false;
      this.isRequired = true;
      this.querytype=1;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Exam";
      this.editControls();
      this.fetchData();
      this.querytype=2;
    } else {
      this.pageTitle = "View Details";
      this.isDisabled = true;
      this.isRequired = false;
      this.fetchData();
      this.querytype=2;
    }

  }

  createForm() {
    this.addExamForm = this.fb.group({
      'title': new FormControl('', { validators: [Validators.required, Validators.pattern('^([A-Za-z0-9 _\'-])*$')] }),
      'year': new FormControl('', { validators: [Validators.required] }),
      'status': new FormControl('', { validators: [Validators.required] })
    });
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditExamDetails();
  }
  bindEditExamDetails() {
    let pagingData = new Utility();
    pagingData = JSON.parse(Paginationutil.getDefaultFilter());
    pagingData.idValue = this.examId.toString();
    //Get Branches API call
    this.ExamsService.getExams(pagingData)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.success) {
          this.editData = result.data[0];
          this.addExamForm.setValue({
            'year': new Date(this.editData.year),
            'title': this.editData.title
          })
        }
      });
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
      let customObj = new Exams();
      customObj = this.addExamForm.value;
      customObj.id = this.examId;
      customObj.querytype = this.querytype;

      //AED Branches API call
      this.ExamsService.AEDExams(customObj)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
          if (result.success) {
            // this.branches= result.data;    
            if (this.formType == "create") {
            this.addExamForm.reset();
            }
            this.successMessage = AppConstants.Messages.successMessage;
          }else{
            this.errorMessage = AppConstants.Messages.errorMessage;
          }
        });
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
