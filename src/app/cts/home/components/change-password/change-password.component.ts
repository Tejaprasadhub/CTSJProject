import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
  matchPassword:boolean=false;
  oldPassword:  FormControl;
  newPassword: FormControl;
  confirmPassword: FormControl;

  constructor(private fb: FormBuilder, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.oldPassword = new FormControl('', { validators: [Validators.required,Validators.minLength(8),Validators.pattern('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$')],updateOn:'change'});
    this.newPassword =  new FormControl('', { validators: [Validators.required,Validators.minLength(8),Validators.pattern('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$')],updateOn:'change' }),
    this.confirmPassword = new FormControl('', { validators: [Validators.required,Validators.minLength(8),Validators.pattern('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$'),CustomPasswordValidator.MatchPassword],updateOn:'change' })
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
    console.log(this.changePasswordForm.value);
    if(this.changePasswordForm.valid){
      this.formSubmitAttempt=false;
      console.log(this.changePasswordForm.value);
      this.changePasswordForm.reset();
      this.successMessage="Your changes have been successfully saved";
    }
  }

  
  list(): void {
    this.location.back();
  }

}
