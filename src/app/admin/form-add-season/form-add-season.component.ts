import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SeasonService} from "../service/season.service";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {CustomDateParserFormatterService} from "../service/custom-date-parser-formatter.service";

@Component({
  selector: 'app-form-add-season',
  templateUrl: './form-add-season.component.html',
  styleUrls: ['./form-add-season.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService },
  ],
})
export class FormAddSeasonComponent implements OnInit{
  form: FormGroup;
  @Input() idLeague: string;
  @Input() dataUpdate: any;
  showAlert = false;
  showUpdate = false;

  constructor(private fb: FormBuilder,
              private seasonService: SeasonService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      place: [''],
      team: ['', Validators.required],
      startTime: [''],
      endTime: [''],
      tournamentType: ['', Validators.required],
      player: [''],
      coach: [''],
      time: ['']
    })

    if(this.dataUpdate) {
      this.setDataUpdate();
    }
  }

  reset() {
    this.form.reset();
  }

  addSeason() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
      const formData = {
        name: this.form.value.name,
        place: this.form.value.place,
        idLeague: this.idLeague,
        numberOfTeams: this.form.value.team,
        typeTournament: this.form.value.tournamentType,
        numberOfPlayers: this.form.value.player,
        numberOfCoach: this.form.value.coach,
        timeOfHalf: this.form.value.time
      };

    if(this.dataUpdate) {
      const formUpdate = {
        id: this.dataUpdate.id,
        ...formData
      }
      this.seasonService.updateSeason(formUpdate).subscribe(data => {
        this.showUpdate = true;
      })
    } else {
      this.seasonService.createSeason(formData).subscribe(data => {
        this.showAlert = true;
      });
    }

  }

  setDataUpdate() {
    this.form = this.fb.group({
      name: [this.dataUpdate.name],
      place: [this.dataUpdate.place],
      team: [this.dataUpdate.numberOfTeams],
      startTime: [''],
      endTime: [''],
      tournamentType: [this.dataUpdate.typeTournament],
      player: [this.dataUpdate.numberOfPlayers],
      coach: [this.dataUpdate.numberOfCoach],
      time: [this.dataUpdate.timeOfHalf]
    })
  }
}
