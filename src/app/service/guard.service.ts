import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Giả sử AuthService là dịch vụ xác thực

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn() || localStorage.getItem('isLoggedIn') === 'true') {
      return true; // Cho phép truy cập nếu người dùng đã đăng nhập
    } else {
      // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
      this.router.navigate(['login']);
      return false;
    }
  }
}
