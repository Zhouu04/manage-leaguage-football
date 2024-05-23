import {Component, computed, signal} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  collapsed = signal(false);

  sideNavWidth = computed(() => this.collapsed() ? '50px' : '200px')
}
