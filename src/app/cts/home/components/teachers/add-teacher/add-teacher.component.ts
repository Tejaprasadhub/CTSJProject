import { Component, OnInit } from '@angular/core';
import { Gender } from 'src/app/cts/shared/models/gender';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { element } from 'protractor';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  branches: SelectItem[] = [];
  gender: SelectItem[] = [];
  qualification: SelectItem[];
  experience: SelectItem[];
  teacherId: string;
  formType: string;
  pageTitle: string;
  editData: any;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  display: boolean = false;
  expertiseIn: SelectItem[];
  associatedClasses: SelectItem[];
  associatedSections: SelectItem[];
  private ngUnsubscribe = new Subject();
  //to create Teacher From 
  addTeacherForm: FormGroup;
  formSubmitAttempt: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.branches = [
      { label: 'branch1', value: '1' },
      { label: 'branch2', value: '2' }
    ];
    this.gender = [
      { label: 'Male', value: 'M' },
      { label: 'Female', value: 'F' }
    ];

    this.qualification = [
      { label: 'B.Ed', value: 'B.Ed' },
      { label: 'M.Ed', value: 'M.Ed' },
      { label: 'Other', value: 'OTH' }
    ];
    this.experience = [
      { label: '0-1(yrs)', value: '0-1' },
      { label: '15-20(yrs)', value: '15-20' },
      { label: '>20(yrs)', value: '>20' }
    ];
    this.expertiseIn = [
      { label: 'Telugu', value: 'T' },
      { label: 'Hindi', value: 'H' },
      { label: 'English', value: 'E' },
      { label: 'Mathmatics', value: 'M' },
      { label: 'Science', value: 'S' }
    ];
    this.associatedClasses = [
      { label: '1st Class', value: '1' },
      { label: '2nd Class', value: '2' },
      { label: '3rd Class', value: '3' },
      { label: '4th Class', value: '4' },
      { label: '5th Class', value: '5' }
    ];
    this.associatedSections = [
      { label: 'A Section', value: 'A' },
      { label: 'B Section', value: 'B' },
      { label: 'C Section', value: 'C' },
      { label: 'D Section', value: 'D' },
      { label: 'E Section', value: 'E' }
    ];
  }

  ngOnInit(): void {// On page load
    //to read url parameters
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.teacherId = window.atob(params['id']);
      this.formType = window.atob(params['type']);
    });
    //to create form with validations
    this.createForm();
    //to check whether the form to be created or updated
    if (this.formType == "create") {
      this.pageTitle = "Add Teacher";
      this.isDisabled = false;
      this.isRequired = true;
    } else if (this.formType == "edit") {
      this.pageTitle = "Edit Teacher";
      this.editControls();
      this.fetchData();
    } else {
      this.pageTitle = "View Details";
      this.isDisabled = true;
      this.isRequired = false;
      this.fetchData();
    }

  }
  //Create form method to constuct a form with validations
  createForm() {
    this.addTeacherForm = this.fb.group({
      'teacherName': new FormControl('', { validators: [Validators.required, Validators.pattern('^([A-Za-z0-9 _\'-])*$')] }),
      'branch': new FormControl('', { validators: [Validators.required] }),
      'dateofbirth': new FormControl('', { validators: [Validators.required] }),
      'gender': new FormControl('', { validators: [Validators.required] }),
      'qualification': new FormControl('', { validators: [Validators.required] }),
      'experience': new FormControl(''),
      'mobile': new FormControl('', { validators: [Validators.required, Validators.pattern('[0-9]\\d{9}')] }),
      'email': new FormControl('', { validators: [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] }),
      'expertiseIn': new FormControl('', { validators: [Validators.required] }),
      'associatedClasses': new FormControl('', { validators: [Validators.required] }),
      'associatedSections': new FormControl('', { validators: [Validators.required] })
    });
  }
  //to fetch data when edit teacher
  private fetchData() {
    // this.loadGender(this.gender);
    this.bindEditTeacherDetails();
  }
  // loadGender(datalist:any){
  //   this.gender=this.bindDropDownList(datalist,'gender');
  // }
  // bindDropDownList(datalist,type){   
  //   let outputList:SelectItem[]=[];
  //   outputList.push({label:"select",value:null})
  //   if(datalist != null){
  //     datalist.forEach(element=>{
  //       let obj:SelectItem;
  //       if(type=="gender"){
  //         obj={label:element.label,value:element.value}
  //       }
  //       outputList.push(obj);
  //     });
  //   }
  //   return outputList;
  // }
  //to bind data to controllers
  bindEditTeacherDetails() {
    this.editData = {
      'teacherName': 'Teja prasad',
      'branch': '1',
      'dateofbirth': '4/5/2020',
      'gender': 'F',
      'qualification': 'OTH',
      'experience': '0-1',
      'mobile': '9640938361',
      'email': 'tejaprasadbehara@gmail.com',
      'expertiseIn': ['T', 'M'],
      'associatedClasses': ['1', '2'],
      'associatedSections': ['A', 'B']
    }

    console.log(this.editData.gender)
    this.addTeacherForm.setValue({
      'teacherName': this.editData.teacherName,
      'branch': this.editData.branch,
      'dateofbirth': this.editData.dateofbirth,
      'gender': this.editData.gender,
      'qualification': this.editData.qualification,
      'experience': this.editData.experience,
      'mobile': this.editData.mobile,
      'email': this.editData.email,
      'expertiseIn': this.editData.expertiseIn,
      'associatedClasses': this.editData.associatedClasses,
      'associatedSections': this.editData.associatedSections
    })
  }
  // Add Teacher method
  addTeacherSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.addTeacherForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.addTeacherForm.value);
      this.addTeacherForm.reset();
      this.successMessage = "Your changes have been successfully saved";
    }
  }
  //Reset form method
  resetForm(): void {
    this.addTeacherForm.reset();
    this.successMessage = "";
  }
  //to make controllers from disable to edit mode
  editControls(): void {
    this.isRequired = true;
    this.isDisabled = false;
    this.pageTitle = "Edit Teacher";
  }
  //navigating to Teachers list page
  list(): void {
    // this.router.navigateByUrl("Teachers");
    this.location.back();
    // this.router.navigate(['/Teachers'], {relativeTo: this.route});
  }

  //This is the method to clear all the form controllers
  private reset() {
    this.addTeacherForm = this.fb.group({
      'teacherName': new FormControl(''),
      'dateofbirth': new FormControl(''),
      'gender': new FormControl(''),
      'qualification': new FormControl(''),
      'experience': new FormControl(''),
      'mobile': new FormControl(''),
      'email': new FormControl(''),
      'expertiseIn': new FormControl(''),
      'associatedClasses': new FormControl(''),
      'associatedSections': new FormControl('')
    })
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
}
