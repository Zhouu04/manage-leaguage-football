import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TeamService } from "../service/team.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormAddTeamComponent } from '../form-add-team/form-add-team.component';
import {delay} from "rxjs";

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {
  teams$: any;
  idTeam: any;
  loadingValue: boolean;
  button = 'Cập nhật';
  isLoading = false;
  closeResult: any;
  dataUpdate: any;
  idSeason: any;
  season: any;
  selectedFile: File | null = null;

  @ViewChild(FormAddTeamComponent) formAddTeamComponent: FormAddTeamComponent;

  constructor(private router: ActivatedRoute, private teamService: TeamService, private modalService: NgbModal) {
  }

  ngOnInit() {
    let id: string | null = this.router.snapshot.paramMap.get('id');
    console.log(id);
    this.idSeason = id;
    this.teamService.getTeamsBySeason(id).pipe(delay(500)).subscribe(data => {
      this.loadingValue = true;
      this.teams$ = data;
      console.log(data);
    })
    this.loadingValue = false;

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

  close() {
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

  openUploadImage(content: any, id: string) {
    this.idTeam = id;
    this.selectedFile = null; // Reset the selected file
    this.modalService.open(content, { size: '' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadImage(modal: any) {
    if (this.selectedFile && this.idTeam) {
      this.isLoading = true;
      this.button = 'Processing';
      this.teamService.uploadImage(this.selectedFile, this.idTeam).subscribe(data => {
        this.isLoading = false;
        this.button = 'Cập nhật';
        this.reloadData();
        modal.close();
      });
    }
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
    this.idTeam = TeamId;
    this.modalService.open(content, { ariaLabelledBy: 'delete-modal' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
}
