import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TeamDTO } from 'src/app/dto/TeamDTO';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent{
  team: any[] = [] ;
  dataUpdate: TeamDTO;
  closeResult = '';
  form: FormGroup;
  constructor(private teamService: TeamService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initData();
    this.form = this.fb.group({
      name: ['', Validators.required],
    })
  }

  initData() {
    this.teamService.getAllTeams().subscribe(teams => {
      this.team = teams
      console.log(this.team);
    });
  }

  open(content: any, team : TeamDTO) {
    this.dataUpdate = team;
    this.form = this.fb.group({
      name: [team.name]
    })
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
