import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, pass: string) {
    if( username === 'tungdao' && pass === '123456') {
      return 200;
    }
    else {
      return 403;
    }
  }
}
