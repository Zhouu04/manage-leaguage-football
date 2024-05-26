import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TeamComponent } from "./team/team.component";
import { LeaguageComponent } from "./leaguage/leaguage.component";
import { StandingComponent } from "./standing/standing.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { ListSeasonComponent } from "./list-season/list-season.component";
import { ListTeamComponent } from "./list-team/list-team.component";
import { ListPlayerComponent } from "./list-player/list-player.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'league',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,

    children: [
      {
        path: 'league',
        component: LeaguageComponent,
        data: {
          breadcrumb: 'Giải đấu'
        }
      },
      {
        path: 'season',
        data: { breadcrumb: { skip: true } },
        children: [
          {
            path: ':id',
            component: ListSeasonComponent,
            data: {
              breadcrumb: 'Mùa giải'
            },
          },
          {
            path: 'teams/:id',
            component: ListTeamComponent,
            data: {
              breadcrumb: 'Đội bóng tham gia'
            }
          },
          {
            path: 'standing/:id',
            component: StandingComponent,
            data: {
              breadcrumb: 'Bảng xếp hạng'
            }
          },
          {
            path: 'schedule/:id',
            component: ScheduleComponent,
            data: {
              breadcrumb: 'Lịch thi đấu'
            }
          }
        ]
      },
      {
        path: 'team',
        component: TeamComponent,
        data: {
          breadcrumb: 'Danh sách đội bóng'
        }
      },
      {
        path: 'player/:id',
        component: ListPlayerComponent,
        data: {
          breadcrumb: 'Cầu thủ'
        }
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
