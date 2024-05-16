import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedDataService} from "../service/share-data-service.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SeasonService} from "../service/season.service";
import {FormAddSeasonComponent} from "../form-add-season/form-add-season.component";
import {ActivatedRoute, Router} from "@angular/router";
import {delay} from "rxjs";


@Component({
  selector: 'app-list-season',
  templateUrl: './list-season.component.html',
  styleUrls: ['./list-season.component.css']
})
export class ListSeasonComponent implements OnInit{
  seasons: any;
  closeResult: any;
  idLeague: any;
  idSeason: string;
  dataUpdate: any;
  @ViewChild(FormAddSeasonComponent) formAddSeasonComponent: FormAddSeasonComponent;

  constructor(
                private modalService: NgbModal,
              private router: ActivatedRoute,
              private seasonService: SeasonService) {}

  ngOnInit() {
    let id = this.router.snapshot.paramMap.get('id');
    this.idLeague = id;
    this.seasonService.getAllByIdLeague(id).pipe(delay(700)).subscribe(data => {
      this.seasons = data;
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
    this.seasonService.getAllByIdLeague(this.idLeague).subscribe(
      data => {
        this.seasons = data;
      }
    );
  }

  openDelete(content: any, seasonId: string) {
    this.idSeason =  seasonId;
    this.modalService.open(content, {ariaLabelledBy: 'delete-modal'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  deleteSeason() {
    this.seasonService.deleteSeason(this.idSeason).subscribe(data => {
      this.reloadData();
    });

    this.modalService.dismissAll();
  }

  openUpdate(content: any, season: any) {
    this.dataUpdate = season;
    this.modalService.open(content, { size: 'lg' }).result.then(
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
