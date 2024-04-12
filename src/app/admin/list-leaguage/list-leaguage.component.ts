import {Component, OnInit} from '@angular/core';
import {LeagueService} from "../service/leaguage.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeagueDTO} from "../../../dto/LeagueDTO";

@Component({
  selector: 'app-list-leaguage',
  templateUrl: './list-leaguage.component.html',
  styleUrls: ['./list-leaguage.component.css']
})
export class ListLeaguageComponent implements OnInit{
  listLeaguage: any[] = [] ;
  dataUpdate: LeagueDTO;
  seasonValue: any;
  closeResult = '';
  form: FormGroup;
  constructor(private leaguageService: LeagueService, private modalService: NgbModal, private fb: FormBuilder,) {
  }

  ngOnInit() {
    this.initData();
    this.form = this.fb.group({
      name: ['', Validators.required],
    })
  }

  initData() {
    this.leaguageService.getAllLeagues().subscribe(leagues => {
      this.listLeaguage = leagues
      console.log(this.listLeaguage);
    });
  }

  open(content: any, league: LeagueDTO) {
    this.dataUpdate = league;
    this.form = this.fb.group({
      name: [league.name]
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

  openDelete(content: any, league: LeagueDTO) {
    this.dataUpdate = league;
    this.form = this.fb.group({
      name: [league.name]
    })
    this.modalService.open(content, {ariaLabelledBy: 'delete-modal'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  deleteLeague() {
    this.leaguageService.deleteLeague(this.dataUpdate.id).subscribe(data => {
      console.log("Xoa thanh cong ", this.dataUpdate.name);
      this.initData();
    })
    this.modalService.dismissAll();
  }


  saveChanges() {
    this.leaguageService.updateLeague({id: this.dataUpdate.id, name: this.form.value.name}).subscribe(data => {
      console.log('update thanh cong', this.form.value);
      this.initData();
    });

    this.modalService.dismissAll();
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

  getSeason(season: string) {
    this.seasonValue = season;
    console.log('seasonvalue ' , this.seasonValue);
  }

  submitForm() {
    if (this.form.valid) {
      const formData = this.form.value;
      const seasonData = {
        name: formData.season,
        place: formData.place,
        team: formData.team,
        startTime: formData.startTime,
        endTime: formData.endTime,
        tournamentType: formData.tournamentType,
        player: formData.player,
        coach: formData.coach,
        time: formData.time
      };

      // this.leaguageService.addSeasonToLeague(formData.name, seasonData);
      console.log(formData);
    } else {
      // Xử lý khi biểu mẫu không hợp lệ
      console.log('Invalid form');
    }
  }

}
