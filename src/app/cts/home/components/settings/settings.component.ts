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
      'sms': new FormControl(''),
      'email1': new FormControl(''),
      'vendor': new FormControl(''),
      'sender': new FormControl(''),
      'transkey': new FormControl(''),
      'promkey': new FormControl(''),
      'email2': new FormControl(''),
      'password': new FormControl('')
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
}
