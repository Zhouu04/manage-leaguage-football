import {Component, OnInit} from '@angular/core';
import {LeagueService} from "../service/leaguage.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeagueDTO} from "../../dto/LeagueDTO";
import {SeasonService} from "../service/season.service";
import {SharedDataService} from "../service/share-data-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-leaguage',
  templateUrl: './list-leaguage.component.html',
  styleUrls: ['./list-leaguage.component.css']
})
export class ListLeaguageComponent implements OnInit{
  listLeaguage: any[] = [] ;
  dataUpdate: LeagueDTO;
  closeResult = '';
  form: FormGroup;
  constructor(private leaguageService: LeagueService,
              private modalService: NgbModal,
              private seasonService: SeasonService,
              private fb: FormBuilder,
              private router: Router,
              private sharedDataService: SharedDataService) {
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

  getSeason(id: string) {
    this.seasonService.getAllByIdLeague(id).subscribe(data => {
      console.log(data);
      this.sharedDataService.setData(data);
      this.router.navigate(['admin/season']);
    })
  }

}
