import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {
  teams: any[] = [];
  standingForm: FormGroup;

  constructor(private teamService: TeamService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.standingForm = this.fb.group({
      // Khởi tạo các controls cho form group nếu cần thiết
    });

    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getAllTeams().subscribe(teams => {
      // Sắp xếp các đội theo số điểm
      this.teams = teams;
    });
  }
}

