import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-studentmarks',
  templateUrl: './studentmarks.component.html',
  styleUrls: ['./studentmarks.component.scss']
})
export class StudentmarksComponent implements OnInit {
  years: any;
  exams:any;
  radioButtonValue: string;
  disabled: boolean = true;
  formSubmitAttempt: boolean = false;
  isDisabled: boolean = true;
  isRequired: boolean = true;
  errorMessage: string = "";
  successMessage: string = "";
  formObj: any;
  name = 'Angular';
  fields = [
    {
      type: "input",
      label: "Telugu",
      inputType: "text",
      name: "name",
      securedMarks:10,
      total:50,
      validations: [
        {
          name: "required",
          validator: "required",
          message: "Name Required"
        }
      ]
    }, 
    {
      type: "input",
      label: "English",
      inputType: "text",
      name: "name",
      securedMarks:25,
      total:50,
      validations: [
        {
          name: "required",
          validator: "required",
          message: "name Required"
        }
      ]
    },
    {
      type: "input",
      label: "English",
      inputType: "text",
      name: "name",
      securedMarks:25,
      total:50,
      validations: [
        {
          name: "required",
          validator: "required",
          message: "name Required"
        }
      ]
    },
    {
      type: "input",
      label: "English",
      inputType: "text",
      name: "name",
      securedMarks:25,
      total:50,
      validations: [
        {
          name: "required",
          validator: "required",
          message: "name Required"
        }
      ]
    },
    {
      type: "input",
      label: "English",
      inputType: "text",
      name: "name",
      securedMarks:25,
      total:50,
      validations: [
        {
          name: "required",
          validator: "required",
          message: "name Required"
        }
      ]
    },
    {
      type: "input",
      label: "English",
      inputType: "text",
      name: "name",
      securedMarks:25,
      total:50,
      validations: [
        {
          name: "required",
          validator: "required",
          message: "name Required"
        }
      ]
    }
  ];
  dynamicForm: FormGroup;
  constructor() {
    this.years = [
      { label: '1st Class', value: '1' },
      { label: '2nd Class', value: '2' },
      { label: '3rd Class', value: '3' }
    ];

    this.exams=[
      {label:"Exam1", value:"1"},
      {label:"Exam2", value:"2"},
      {label:"Exam3", value:"3"}
    ]

    const controls = {};
    this.fields.forEach(res => {
      const validationsArray = [];
      res.validations.forEach(val => {
        if (val.name === 'required') {
          validationsArray.push(
            Validators.required
          );
        }
        if (val.name === 'pattern') {
          validationsArray.push(
            Validators.pattern(val.validator)
          );
        }
      });
      controls[res.label] = new FormControl('', validationsArray);
    });
    this.dynamicForm = new FormGroup(
      controls
    );
  }
  ngOnInit(): void {
    this.radioButtonValue = 'P';
    var object = {};
    this.fields.forEach(function (value) {
      object[value.label] = value.securedMarks;
  });
  this.dynamicForm.setValue(object)
  }

  editControls(): void {
    this.isDisabled = false;
  }

  onSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.dynamicForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.dynamicForm.value);
    }
  }
  resetForm(): void {
    this.dynamicForm.reset();
    this.successMessage = "";
    this.errorMessage = "";
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}


}
