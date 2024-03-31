import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { LeaguageComponent } from './leaguage/leaguage.component';
import { TeamComponent } from './team/team.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingComponent } from './standing/standing.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminSidenavComponent,
    LeaguageComponent,
    TeamComponent,
    ScheduleComponent,
    StandingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [

  ]
})
export class AdminModule { }
