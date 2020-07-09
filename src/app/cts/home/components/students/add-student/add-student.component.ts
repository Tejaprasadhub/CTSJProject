import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  pageTitle: string;
  errorMessage: string = "";
  successMessage: string = "";
  private ngUnsubscribe = new Subject();
  studentId: string;
  formType: string;
  editData: any;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  addStudentForm: FormGroup;
  formSubmitAttempt: boolean = false;
  gender: SelectItem[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private location:Location) {
    this.gender = [
      { label: 'Male', value: 'M' },
      { label: 'Female', value: 'F' }
    ];
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.studentId = params['id'];
      this.formType = params['type'];
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Student";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Student";
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
    this.addStudentForm = this.fb.group({
      'firstName': new FormControl('', { validators: [Validators.required] }),
      'middleName': new FormControl(''),
      'lastName': new FormControl('', { validators: [Validators.required] }),
      'dateofbirth': new FormControl('', { validators: [Validators.required] }),
      'gender': new FormControl('', { validators: [Validators.required] }),
      'joineddate': new FormControl('', { validators: [Validators.required] }),
      'email': new FormControl('', { validators: [Validators.pattern('')] }),
      'class': new FormControl('', { validators: [Validators.required] }),
      'section': new FormControl('', { validators: [Validators.required] }),
      'd_noc': new FormControl(''),
      'streetc': new FormControl(''),
      'countryc': new FormControl(''),
      'statec': new FormControl('',{ validators: [Validators.required] }),
      'districtc': new FormControl(''),
      'cityc': new FormControl('',{ validators: [Validators.required] }),
      'pincodec': new FormControl(''),
      'homephn': new FormControl(''),
      'mblno': new FormControl('', { validators: [Validators.required] }),
      'd_nop': new FormControl(''),
      'streetp': new FormControl(''),
      'countryp': new FormControl(''),
      'statep': new FormControl('',{ validators: [Validators.required] }),
      'districtp': new FormControl(''),
      'cityp': new FormControl('',{ validators: [Validators.required] }),
      'pincodep': new FormControl(''),
      'pfname': new FormControl('',{ validators: [Validators.required] }),
      'plname': new FormControl('',{ validators: [Validators.required] }),
      'pmobile': new FormControl('',{ validators: [Validators.required] }),
      'pemail': new FormControl(''),
      'e1fname': new FormControl(''),
      'e1lname': new FormControl(''),
      'e1mobile': new FormControl(''),
      'e1email': new FormControl(''),
      'e2fname': new FormControl(''),
      'e2lname': new FormControl(''),
      'e2mobile': new FormControl(''),
      'e2email': new FormControl('')
    });
  }

  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Student";
  }

  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditStudentDetails();
  }

  bindEditStudentDetails() {
    this.editData = {
      'firstName': "Sindhuja",
      'middleName': "",
      'lastName': "Chinchilam",
      'dateofbirth': "07/25/1995",
      'gender': "F",
      'joineddate': "01/01/2020",
      'email': "chinchilam@gmail.com",
      'class': "6",
      'section': "A",
      'd_noc': "24/7",
      'streetc': "padmavathi nagar",
      'countryc': "india",
      'statec': "AP",
      'districtc': "vzm",
      'cityc': 'vzm',
      'pincodec': "535002",
      'homephn': "786876",
      'mblno': "897882332",
      'd_nop': "24/7",
      'streetp': "padmavathi nagar",
      'countryp':  "india",
      'statep': "AP",
      'districtp': "vzm",
      'cityp': "vzm",
      'pincodep': "535002",
      'pfname': "teja",
      'plname': "behara",
      'pemail': "teja@gmail.com",
      'pmobile': "9640938361",
      'e1fname': "teja",
      'e1lname': "behara",
      'e1email': "teja@gmail.com",
      'e1mobile': "9640938361",
      'e2fname': "teja",
      'e2lname': "behara",
      'e2email': "teja@gmail.com",
      'e2mobile': "9640938361"
    }

    this.addStudentForm.setValue({
      'firstName': this.editData.firstName,
      'middleName': this.editData.middleName,
      'lastName': this.editData.lastName,
      'dateofbirth': this.editData.dateofbirth,
      'gender': this.editData.gender,
      'joineddate': this.editData.joineddate,
      'email': this.editData.email,
      'class': this.editData.class,
      'section': this.editData.section,
      'd_noc': this.editData.d_noc,
      'streetc': this.editData.streetc,
      'countryc': this.editData.countryc,
      'statec': this.editData.statec,
      'districtc': this.editData.districtc,
      'cityc': this.editData.cityc,
      'pincodec': this.editData.pincodec,
      'homephn': this.editData.homephn,
      'mblno': this.editData.mblno,
      'd_nop': this.editData.d_nop,
      'streetp': this.editData.streetp,
      'countryp': this.editData.countryp,
      'statep': this.editData.statep,
      'districtp': this.editData.districtp,
      'cityp': this.editData.cityp,
      'pincodep': this.editData.pincodep,
      'pfname': this.editData.pfname,
      'plname': this.editData.plname,
      'pemail': this.editData.pemail,
      'pmobile':this.editData.pmobile,
      'e1fname': this.editData.e1fname,
      'e1lname': this.editData.e1lname,
      'e1email': this.editData.e1email,
      'e1mobile':this.editData.e1mobile,
      'e2fname': this.editData.e2fname,
      'e2lname': this.editData.e2lname,
      'e2email': this.editData.e2email,
      'e2mobile':this.editData.e2mobile
    })
  }
  addStudentSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addStudentForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addStudentForm.value);
      this.addStudentForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }
  list(): void {
    // this.router.navigateByUrl("Teachers");
    this.location.back();
  }
  resetForm(): void {
    this.addStudentForm.reset();
    this.successMessage = "";
  }
}
