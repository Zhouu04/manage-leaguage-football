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
  idLeague: any;
  selectedFile: File | null = null;
  dataUpdate: LeagueDTO;
  closeResult = '';
  isLoading = false;
  button = 'Cập nhật';
  form: FormGroup;
  constructor(private leaguageService: LeagueService,
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

  uploadImage(modal: any) {
    if (this.selectedFile && this.idLeague) {
      this.isLoading = true;
      this.button = 'Processing';
      this.leaguageService.uploadImage(this.selectedFile, this.idLeague).subscribe(data => {
        this.isLoading = false;
        this.button = 'Cập nhật';
        this.initData();
        modal.close();
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  openUploadImage(content: any, id: string) {
    this.idLeague = id;
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

}
