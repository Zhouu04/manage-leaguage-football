import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ScheduleService} from "../service/schedule.service";
import {SeasonService} from "../service/season.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{
  schedules: any;
  typeTournament: any;
  dataUpdate: any;
  closeResult: any;
  form: FormGroup;

  constructor(
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private scheduleService: ScheduleService,
    private seasonService: SeasonService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initData();
    this.form = this.fb.group({
      homeScore: '',
      awayScore: '',
    })

  }

  initData() {
    let id = this.router.snapshot.paramMap.get('id');
    this.seasonService.getSeasonById(id).subscribe(data => {
        this.typeTournament = data.typeTournament;
        this.scheduleService.getSchedulesBySeasonId(id).subscribe(data => {
          if(data.length > 0) {
            this.schedules = this.chunkArray(data, 4);;
            console.log('data co san', data);
          } else {
            if(this.typeTournament == 'vongtron')
              this.generateRoundSchedule(id);
            else if(this.typeTournament == 'loaitructiep')
              this.generateKnockOutSchedule(id);
          }
        })

      }
    )
  }

  generateRoundSchedule(id: string|null) {
    this.scheduleService.addScheduleRound(id).subscribe(data => {
      this.schedules = this.chunkArray(data, 4);
      console.log(data, 'add data round');
    })
  }

  generateKnockOutSchedule(id: string|null) {
    this.scheduleService.addScheduleKnockOut(id).subscribe(data => {
      this.schedules = this.chunkArray(data, 4);;
      console.log(data, 'add data knock-out');
    })
  }

  chunkArray(array: any[], chunkSize: number): any[] {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  openFormUpdate(content: any, data: any) {
    this.dataUpdate = data;
    if(this.dataUpdate.homeScore != null) {
      this.form = this.fb.group({
        homeScore: this.dataUpdate.homeScore,
        awayScore: this.dataUpdate.awayScore,
      })
    }
    this.modalService.open(content, { size: '' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  close(){
    this.modalService.dismissAll();
  }

  updateScore() {
    this.dataUpdate.homeScore = this.form.value.homeScore;
    this.dataUpdate.awayScore = this.form.value.awayScore;
    this.scheduleService.updateScore(this.dataUpdate).subscribe(data => {
      this.initData();
      this.modalService.dismissAll()
    })

    this.form.reset();
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
