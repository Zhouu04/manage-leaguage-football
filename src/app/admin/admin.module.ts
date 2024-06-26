import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from "./admin-routing.module";
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
import { FormAddTeamComponent } from "./form-add-team/form-add-team.component";
import { StepComponent } from './step/step.component';
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";
import {SkeletonModule} from "primeng/skeleton";
import { FormAddPlayerComponent } from "./form-add-player/form-add-player.component";
import { TopScorersPipe } from "./list-player/list-player.component";
import { ListPlayerComponent } from "./list-player/list-player.component";
import {FilterPipe} from "./filter.pipe";
import {PaginatorModule} from "primeng/paginator";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {BreadcrumbModule} from 'xng-breadcrumb';
@NgModule({
  declarations: [
    AdminComponent,
    LeaguageComponent,
    TeamComponent,
    ScheduleComponent,
    StandingComponent,
    AddLeaguageComponent,
    ListLeaguageComponent,
    ListSeasonComponent,
    FormAddSeasonComponent,
    ListTeamComponent,
    FormAddTeamComponent,
    FormAddPlayerComponent,
    ListPlayerComponent,
    StepComponent,
    TopScorersPipe,
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
    BreadcrumbModule,
    ToastModule,
    StepsModule,
    SkeletonModule,
    FilterPipe,
    PaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [

  ]
})
export class AdminModule { }
