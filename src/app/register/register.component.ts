import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CustomvalidationService } from "../service/Customvalidation.service";
import { UserService } from '../admin/service/user.service';
import { UserDTO } from 'src/app/dto/UserDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errMsg = "";
  registerForm: FormGroup;
  submitted = false;
  registrationSuccess = false;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get fullname() {
    return this.registerForm.get('fullname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const user: UserDTO = this.registerForm.value;
      this.userService.registerUser(user).subscribe(
        response => {
          this.registrationSuccess = true;
          this.router.navigate(['/login']); 
        },
        error => {
          this.errMsg = 'Registration failed. Please try again.';
          console.error('Registration error:', error);
        }
      );
    }
  }
}
