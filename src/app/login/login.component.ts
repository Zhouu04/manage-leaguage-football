import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import { LocalStorageService } from '../service/localStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit{
  errMsg = "";
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
        ]),
      ],
      rememberMe: false,


    });
    const savedLoginInfo = this.localStorageService.getItem('loginInfo');
    if (savedLoginInfo && savedLoginInfo.rememberMe) {
      this.loginForm.patchValue({
        username: savedLoginInfo.username,
        password: savedLoginInfo.password,
        rememberMe: true,
      });
    }
  }

  // login() {
  //   let res = this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
  //   if(res === 200) {
  //     this.router.navigate(['admin']);
  //   }
  //   if( res === 403) {
  //     this.errMsg = "User/Password is incorrect";
  //   }
  // }
  login() {
    let res = this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    if (res === 200) {
      this.router.navigate(['admin']);
    } else if (res === 403) {
      this.errMsg = "User/Password is incorrect";
    }

    if (this.loginForm.value.rememberMe) {
      this.localStorageService.setItem('loginInfo', {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        rememberMe: true
      });
    } else {
      this.localStorageService.removeItem('loginInfo');
    }
  }
 


}
