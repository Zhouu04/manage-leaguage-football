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
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { AddLeaguageComponent } from './add-leaguage/add-leaguage.component';
import { ListLeaguageComponent } from './list-leaguage/list-leaguage.component';
import {MatInputModule} from "@angular/material/input";
import {ControlMessagesComponent} from "../share/control-message/control-message.component";
import {HttpClientModule} from "@angular/common/http";
import { ListSeasonComponent } from './list-season/list-season.component';
import { FormAddSeasonComponent } from './form-add-season/form-add-season.component';
import { ListTeamComponent } from './list-team/list-team.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminSidenavComponent,
    LeaguageComponent,
    TeamComponent,
    ScheduleComponent,
    StandingComponent,
    AddLeaguageComponent,
    ListLeaguageComponent,
    ListSeasonComponent,
    FormAddSeasonComponent,
    ListTeamComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    MatInputModule,
    HttpClientModule,
    ControlMessagesComponent,
  ],
  exports: [

  ]
})
export class AdminModule { }
