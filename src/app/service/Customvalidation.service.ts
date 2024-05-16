import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { UserDTO } from '../dto/UserDTO';
import { UserService } from '../admin/service/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor(private userService: UserService) { }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const email = control.value;
      return this.userService.checkEmailExists(email).pipe(
        map((exists: boolean) => {
          return exists ? { 'emailExists': true } : null;
        }),
        catchError(() => {
          return of(null);
        })
      );
    };
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
