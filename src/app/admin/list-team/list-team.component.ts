import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../service/team.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SharedDataService} from "../service/share-data-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormAddTeamComponent } from '../form-add-team/form-add-team.component';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit{
  teams$: any;
  idTeam : any;
  idLeague: any;
  closeResult: any;
  dataUpdate: any;
  idSeason: any;
  season: any;

  @ViewChild(FormAddTeamComponent) formAddTeamComponent: FormAddTeamComponent;

  constructor(private router: ActivatedRoute, private teamService: TeamService, private modalService: NgbModal,) {
  }

  ngOnInit() {
    let id: string | null = this.router.snapshot.paramMap.get('id');
    console.log(id);
    this.idSeason = id;
    this.teamService.getTeamsBySeason(id).subscribe(data => {
      this.teams$ = data;
      console.log(data);
    })
  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  close(){
    this.reloadData();
    this.modalService.dismissAll();
  }

  reloadData() {
    this.teamService.getTeamsBySeason(this.idSeason).subscribe(
      data => {
        this.teams$ = data;
        
      }
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
  deleteTeam() {
    this.teamService.deleteTeam(this.idTeam).subscribe(data => {
      this.reloadData();
    });

    this.modalService.dismissAll();
  }

  openUpdate(content: any, teams: any) {
    this.dataUpdate = teams;
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openDelete(content: any, TeamId: string) {
    this.idTeam =  TeamId;
    this.modalService.open(content, {ariaLabelledBy: 'delete-modal'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  


 




}
