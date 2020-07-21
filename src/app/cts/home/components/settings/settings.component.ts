import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  sms: SelectItem[] = [];
  email: SelectItem[] = [];
  vendor: SelectItem[] = [];
  settingsForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";
  formSubmitAttempt: boolean = false;
  smsDiv: boolean = false;
  emailDiv: boolean = false;
   isRequired: boolean = false;

  constructor(private fb: FormBuilder) {
    this.sms = [
      { label: 'Yes', value: 'Y' },
      { label: 'No', value: 'N' }
    ];
    this.email = [
      { label: 'Yes', value: 'Y' },
      { label: 'No', value: 'N' }
    ];
    this.vendor = [
      { label: 'Test Local', value: 'text' },
      { label: 'Web Sms', value: 'sms' }
    ];
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.settingsForm = this.fb.group({
      'sms': new FormControl('',{ validators: [Validators.required] }),
      'email1': new FormControl('',{ validators: [Validators.required] }),
      'vendor': new FormControl('',{ validators: [Validators.required] }),
      'sender': new FormControl('',{ validators: [Validators.required] }),
      'transkey': new FormControl('',{ validators: [Validators.required] }),
      'promkey': new FormControl('',{ validators: [Validators.required] }),
      'email2': new FormControl('', { validators: [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] }),
      'password': new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]
      })
    });
  }
  settingsSubmit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.formSubmitAttempt = true;
    if (this.settingsForm.valid) {
      this.formSubmitAttempt = false;
      console.log(this.settingsForm.value);
      this.successMessage = "Your changes have been successfully saved";
    }
  }
  dropdownChange(event, type): void {
    if (type == 'sms') {
      if (event.value == "Y") 
        this.smsDiv = true      
      else 
        this.smsDiv = false      
    }
    else {
      if (event.value == "Y") 
        this.emailDiv = true      
      else 
        this.emailDiv = false      
    }
  }
}
