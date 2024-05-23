import {Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  logout() {
    this.userService.logout().subscribe(() => {
     
      this.router.navigateByUrl('/home');
    }, error => {
      console.error('Error logging out:', error);
    });
  }

  
}
