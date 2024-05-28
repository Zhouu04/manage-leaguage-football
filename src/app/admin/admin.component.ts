import {Component, computed, OnInit, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  collapsed = signal(false);

  sideNavWidth = computed(() => this.collapsed() ? '50px' : '200px')
  constructor(private breakpointObserver: BreakpointObserver) { }
  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.collapsed.set(true);
        } else {
          this.collapsed.set(false);
        }
      });
  }
}
