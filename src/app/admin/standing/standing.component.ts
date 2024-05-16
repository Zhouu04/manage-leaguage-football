import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TeamService } from '../service/team.service';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {
  teams: any;
  standingForm: FormGroup;
  idSeason: any;

  constructor(private teamService: TeamService, private fb: FormBuilder, private router: ActivatedRoute ) { }

  ngOnInit(): void {
    let id: string = ''; 
    const idParam = this.router.snapshot.paramMap.get('id');
    if (idParam !== null) {
           id = idParam; 
    } else {}
    console.log(id);
    this.idSeason = id;
    this.teamService.getTeamOrderByScore(id).subscribe(data => {
      this.teams = data;
      console.log(data);
    })

    // this.getTeams();
  }


  // getTeams(): void {
  //   this.teamService.getAllTeams().subscribe(teams => {
  //     // Sắp xếp các đội theo số điểm
  //     this.teams = teams;
  //   });
  // }
}

