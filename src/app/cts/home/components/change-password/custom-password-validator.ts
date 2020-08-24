import { AbstractControl } from '@angular/forms';

export class CustomPasswordValidator {
    static MatchPassword(AC:AbstractControl){
        const formGroup = AC.parent;
        if(formGroup){
            const passwordControl = formGroup.get('newPassword');
            const confirmPasswordControl = formGroup.get('confirmPassword');
            debugger
            if(passwordControl && confirmPasswordControl){
                const password = passwordControl.value;
                const confirmPassword = confirmPasswordControl.value;
                if(password !== confirmPassword){
                    return {matchPassword:true}
                }else{
                    return {matchPassword:false}
                }
            }
        }
        return {matchPassword:false}
    }
}

export class customLessThanCurrentDateValidator{
    static ValidDate(AC:AbstractControl){
        const formGroup = AC.parent;
        if(formGroup){
            const doiControl = formGroup.get('doi');
            const selectedDoi = doiControl.value;
            const currentDate = new Date().getTime()-(30*24*60*60*1000)
            if(currentDate > selectedDoi){
                return {ValidDate: true};
            }else{
                return null;
            }
        }
    }
}
