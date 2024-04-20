import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../service/team.service";

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit{
  teams$: any;

  constructor(private router: ActivatedRoute, private teamService: TeamService) {
  }

  ngOnInit() {
    let id = this.router.snapshot.paramMap.get('id');
    this.teamService.getTeamsBySeason(id).subscribe(data => {
      this.teams$ = data;
    })
  }
}
