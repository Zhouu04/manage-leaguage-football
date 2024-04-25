import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor() { }

  userNameValidator(control: AbstractControl) {
    const userNameRegex: RegExp = /^[a-zA-Z0-9]+$/;
    if (control.value && !userNameRegex.test(control.value)) {
      return { invalidUsername: true };
    }
    return null;
  }

  patternValidator() {
    return (control: AbstractControl) => {
      const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (control.value && !passwordRegex.test(control.value)) {
        return { invalidPassword: true };
      }
      return null;
    };
  }
  MatchPassword(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: AbstractControl) => {
      const passwordControl = formGroup.get(passwordKey);
      const confirmPasswordControl = formGroup.get(confirmPasswordKey);
  
  
      if (passwordControl && confirmPasswordControl) {
        const passwordValue = passwordControl.value;
        const confirmPasswordValue = confirmPasswordControl.value;
  
        if (passwordValue !== confirmPasswordValue) {
          confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
      }
    };
  }
  
  
  
}
