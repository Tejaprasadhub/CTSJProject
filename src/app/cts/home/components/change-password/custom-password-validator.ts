import { AbstractControl } from '@angular/forms';

export class CustomPasswordValidator {
    static MatchPassword(AC:AbstractControl){
        const formGroup = AC.parent;
        if(formGroup){
            const oldPasswordControl = formGroup.get('oldPassword');
            const newPasswordControl = formGroup.get('newPassword');
            const confirmPasswordControl = formGroup.get('confirmPassword');            
            // if(newPasswordControl && confirmPasswordControl && oldPasswordControl){
            //     const newPassword = newPasswordControl.value;
            //     const confirmPassword = confirmPasswordControl.value;                
            //     const oldPassword = oldPasswordControl.value;                
            //     if(newPassword === confirmPassword && oldPassword !== newPassword){                  
            //         return {matchPassword:false}
            //     }else{
            //         return null;
            //     }
            // }

            if(newPasswordControl && confirmPasswordControl){
                const newPassword = newPasswordControl.value;
                const confirmPassword = confirmPasswordControl.value;
                if(newPassword !== confirmPassword){
                    return {matchPassword :true};
                }else{
                    return null;
                }
            }
        }
        return null;
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
