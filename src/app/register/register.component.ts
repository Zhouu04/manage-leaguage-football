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
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', [Validators.required]],
    },
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
      const user: UserDTO = this.registerForm.value;
      console.log(user);

      // this.userService.registerUser(user)

      this.userService.registerUser(user).subscribe(
        response => {
          this.registrationSuccess = true;
          this.router.navigate(['/login']);
          console.log('Da chay vao submit')
        },
        error => {
          this.errMsg = 'Registration failed. Please try again.';
          console.error('Registration error:', error);
        }
      );
    console.log('Da submit xong')
  }
}
