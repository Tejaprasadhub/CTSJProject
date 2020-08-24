import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomPasswordValidator } from './custom-password-validator';

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
  oldPassword:  FormControl;
  newPassword: FormControl;
  confirmPassword: FormControl;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.oldPassword = new FormControl('', { validators: [Validators.required],updateOn:'change'});
    this.newPassword =  new FormControl('', { validators: [Validators.required],updateOn:'change' }),
    this.confirmPassword = new FormControl('', { validators: [Validators.required,CustomPasswordValidator.MatchPassword],updateOn:'change' })
  }

  createForm(){
    this.changePasswordForm = new FormGroup({
      oldPassword:this.oldPassword,
      newPassword:this.newPassword,
      confirmPassword:this.confirmPassword
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
