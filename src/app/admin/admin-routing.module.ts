import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TeamComponent} from "./team/team.component";
import {LeaguageComponent} from "./leaguage/leaguage.component";
import {StandingComponent} from "./standing/standing.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {ListSeasonComponent} from "./list-season/list-season.component";
import {ListLeaguageComponent} from "./list-leaguage/list-leaguage.component";
import {ListTeamComponent} from "./list-team/list-team.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'league', // Điều hướng người dùng đến component Leaguage đầu tiên
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'team', component: TeamComponent},
      {path: 'season/:id', component: ListSeasonComponent},
      {path: 'season/teams/:id', component: ListTeamComponent},
      {path: 'league', component: LeaguageComponent},
      {path: 'season/standing/:id', component: StandingComponent},
      {path: 'season/schedule/:id', component: ScheduleComponent},
    ]
  },


];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
