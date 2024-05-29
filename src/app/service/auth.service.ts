import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  constructor() { }

  login(username: string, pass: string) {
   
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

    
    if (registeredUsers[username] === pass) {
      this.loggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      return 200;
    } else {
      this.loggedIn = false;
      return 403;
    }
  }

  isLoggedIn(): boolean {

    return localStorage.getItem('isLoggedIn') === 'false';
  }

  

  register(username: string, password: string): number {
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  
 
    if (registeredUsers[username]) {
      return 409; 
    }
  
   
    registeredUsers[username] = password;
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  
    return 201;
  }
}
