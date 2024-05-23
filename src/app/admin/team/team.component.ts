import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TeamDTO } from 'src/app/dto/TeamDTO';
import { TeamService } from '../service/team.service';
import {TeamPageInfo} from "../../dto/TeamPageInfo";
import {delay, Observable} from "rxjs";
import { ActivatedRoute } from '@angular/router';
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
  idTeam: any;
  searchText: any;
  loadingValue: boolean;
  pageableInfo: TeamPageInfo = {
    currentPage: 1,
    recordPerPage: 5,
  };
  totalRecords: number ;
  constructor(private teamService: TeamService,
              private modalService: NgbModal,
              private fb: FormBuilder, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.initData();
    this.form = this.fb.group({
      name: ['', Validators.required],
    })
    
    this.teamService.searchTeam(this.pageableInfo).pipe(delay(500)).subscribe(data => {
      this.loadingValue = true;
      this.team = data;
    })
    this.teamService.countTeam(this.pageableInfo).subscribe(data => {
      this.totalRecords = data;
    });
    this.loadingValue = false;
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

  onPageChange(event: any) {
    this.pageableInfo.currentPage = event.page + 1;
    this.pageableInfo.recordPerPage = event.rows;
    this.reloadData();
  }

  reloadData() {
    this.teamService.searchTeam(this.pageableInfo).subscribe(
      data => {
        this.team = data;
      }
    );
  }

}
