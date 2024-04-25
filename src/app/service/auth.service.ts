import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  constructor() { }

  login(username: string, pass: string) {
    // if( username === 'tungdao' && pass === '123456') {
    //   this.loggedIn = true;
    //   localStorage.setItem('isLoggedIn', 'true');
    //   return 200;
    // }
    // else {
    //   this.loggedIn = false;
    //   return 403;
    // }
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

    // Kiểm tra xem tên người dùng và mật khẩu có tồn tại trong Local Storage không
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

    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // register(username: string, password: string): number {
    
  //   return 201;
  // }

  register(username: string, password: string): number {
    // Lấy thông tin đăng ký từ Local Storage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  
    // Kiểm tra xem tên người dùng đã tồn tại chưa
    if (registeredUsers[username]) {
      return 409; // Conflict, tên người dùng đã tồn tại
    }
  
    // Lưu thông tin đăng ký vào Local Storage
    registeredUsers[username] = password;
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  
    return 201; // Created, đăng ký thành công
  }
}
