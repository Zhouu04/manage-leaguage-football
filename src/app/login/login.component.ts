import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../admin/service/user.service';
import {UserDTO} from "../dto/UserDTO";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMsg = '';
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  login() {
    const userDTO: UserDTO = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.userService.login(userDTO).subscribe({
      next: (success) => {
        if (success) {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['admin']);
        } else {
          this.errMsg = 'User/Password is incorrect';
        }
      },
      error: (error) => {
        console.error('Login error', error);
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }

}
