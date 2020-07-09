import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  formSubmitAttempt: boolean = false;
  errorMessage:string="";
  successMessage:string="";
  isRequired:boolean=false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      'oldPassword': new FormControl('', { validators: [Validators.required]}),
      'newPassword': new FormControl('', { validators: [Validators.required] }),
      'confirmPassword': new FormControl('', { validators: [Validators.required] })
    });
  }

  changePwdSubmit(): void {
    this.errorMessage="";
    this.successMessage="";
    this.formSubmitAttempt = true;
    if(this.changePasswordForm.valid){
      this.formSubmitAttempt=false;
      console.log(this.changePasswordForm.value);
      this.changePasswordForm.reset();
      this.successMessage="Your changes have been successfully saved";
    }
  }

}
