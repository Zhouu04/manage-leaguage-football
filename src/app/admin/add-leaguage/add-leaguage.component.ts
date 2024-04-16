import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbDateParserFormatter, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomDateParserFormatterService} from "../service/custom-date-parser-formatter.service";
import {LeagueService} from "../service/leaguage.service";
import {SeasonService} from "../service/season.service";


@Component({
  selector: 'app-add-leaguage',
  templateUrl: './add-leaguage.component.html',
  styleUrls: ['./add-leaguage.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService },
  ],
})
export class AddLeaguageComponent implements OnInit{
  public isCollapsed = true;
  successMessage = '';
  showAlert = false;
  form: FormGroup;
  isError: boolean;
  league: any;
  seasonData: any;

  constructor(private fb: FormBuilder,
              private seasonService: SeasonService,
              private leagueService: LeagueService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nameLeague: ['', Validators.required],
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

  }


  addLeaguage() {
    if(this.form.value.nameLeague == '') {
      this.form.markAllAsTouched();
      return
    } else {
      this.isError = false;
      const leagueName = this.form.value.nameLeague;
      this.leagueService.createLeague({name: leagueName}).subscribe(
        data => {
          this.league = data;
          console.log(data);
        }
      );

      this.successMessage = "Thêm giải đấu thành công, Vui lòng tạo mùa giải !";
    }
  }

  submitForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid) {
      const formData = this.form.value;
      this.seasonData = {
        name: formData.name,
        place: formData.place,
        idLeague: this.league.id,
        numberOfTeams: formData.team,
        // timeStart: formData.startTime,
        // timeEnd: formData.endTime,
        typeTournament: formData.tournamentType,
        numberOfPlayers: formData.player,
        numberOfCoach: formData.coach,
        timeOfHalf: formData.time
      };

      this.seasonService.createSeason(this.seasonData).subscribe(data => {
        this.showAlert = true;
      })
    }
  }


}
