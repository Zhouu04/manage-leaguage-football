import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbDateParserFormatter, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomDateParserFormatterService} from "../service/custom-date-parser-formatter.service";
import {LeagueService} from "../service/leaguage.service";


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


  constructor(private fb: FormBuilder, private leagueService: LeagueService, private modalService: NgbModal) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      season: ['', Validators.required],
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
    if(this.form.value.name == '') {
      this.isError = true;
      return ;
    } else {
      this.isError = false;
      const leagueName = this.form.value.name;
      console.log(leagueName, 'league')
      this.leagueService.createLeague({name: leagueName}).subscribe();
      this.successMessage = "Thêm giải đấu thành công, Vui lòng tạo mùa giải !";
    }
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
      this.showAlert = true;
      console.log(formData);
    } else {
      // Xử lý khi biểu mẫu không hợp lệ
      console.log('Invalid form');
    }
  }


}
