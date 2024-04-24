import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ScheduleService} from "../service/schedule.service";
import {SeasonService} from "../service/season.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{
  schedule: any;
  typeTournament: any;
  groupedSchedule: any[];

  constructor(
    private router: ActivatedRoute,
    private scheduleService: ScheduleService,
    private seasonService: SeasonService
  ) {}

  ngOnInit() {
    this.initData();

  }

  initData() {
    let id = this.router.snapshot.paramMap.get('id');
    this.seasonService.getSeasonById(id).subscribe(data => {
        this.typeTournament = data.typeTournament;
        this.scheduleService.getSchedulesBySeasonId(id).subscribe(data => {
          if(data.length > 0) {
            this.schedule = data;
            this.groupedSchedule = this.chunkArray(data, 4);
            console.log('data co san', data);
          } else {
            if(this.typeTournament == 'vongtron')
              this.generateRoundSchedule(id);
            else if(this.typeTournament == 'loaitructiep')
              this.generateKnockOutSchedule(id);
          }
        })

      }
    )
  }

  generateRoundSchedule(id: string|null) {
    this.scheduleService.addScheduleRound(id).subscribe(data => {
      this.schedule = data;
      console.log(data, 'add data round');
    })
  }

  generateKnockOutSchedule(id: string|null) {
    this.scheduleService.addScheduleKnockOut(id).subscribe(data => {
      this.schedule = data;
      console.log(data, 'add data knock-out');
    })
  }

  chunkArray(array: any[], chunkSize: number): any[] {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }



}
