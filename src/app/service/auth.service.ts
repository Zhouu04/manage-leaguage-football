import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  constructor() { }

  login(username: string, pass: string) {
    if( username === 'tungdao' && pass === '123456') {
      this.loggedIn = true;
      return 200;
    }
    else {
      this.loggedIn = false;
      return 403;
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
