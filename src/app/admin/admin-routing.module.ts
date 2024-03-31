import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TeamComponent} from "./team/team.component";
import {LeaguageComponent} from "./leaguage/leaguage.component";
import {StandingComponent} from "./standing/standing.component";
import {ScheduleComponent} from "./schedule/schedule.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'team', component: TeamComponent},
      {path: 'leaguage', component: LeaguageComponent},
      {path: 'standing', component: StandingComponent},
      {path: 'schedule', component: ScheduleComponent},
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
