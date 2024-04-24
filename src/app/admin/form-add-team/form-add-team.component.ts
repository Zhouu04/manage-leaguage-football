import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TeamService } from "../service/team.service";



@Component({
  selector: 'app-form-add-team',
  templateUrl: './form-add-team.component.html',
  styleUrls: ['./form-add-team.component.css'],
  
})
export class FormAddTeamComponent implements OnInit {
  formteam: FormGroup;

  @Input() idSeason: string;
  @Input() dataUpdate: any;
  showAlert = false;
  showUpdate = false;

  constructor(private fb: FormBuilder,
              private teamService: TeamService) {}

  ngOnInit() {
    this.formteam = this.fb.group({
      name: ['', Validators.required],
      coach: [''],
      facebook: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.dataUpdate) {
      this.setDataUpdate();
    }
  }

  reset() {
    this.formteam.reset();
  }

  addTeam() {
    if (!this.formteam.valid) {
      this.formteam.markAllAsTouched();
      return;
    }

    const formData = {
      name: this.formteam.value.name,
      coach: this.formteam.value.coach,
      facebook: this.formteam.value.facebook,
      phone: this.formteam.value.phone,
      email: this.formteam.value.email,
      idSeason: this.idSeason
    };

    if (this.dataUpdate) {
      const formUpdate = {
        id: this.dataUpdate.id,
        ...formData
      };

      this.teamService.updateTeam(formUpdate).subscribe(data => {
        this.showUpdate = true;
      });
    } else {
      this.teamService.createTeam(formData).subscribe(data => {
        this.showAlert = true;
      });
    }
  }

  setDataUpdate() {
    this.formteam.setValue({
      name: this.dataUpdate.name,
      coach: this.dataUpdate.coach,
      facebook: this.dataUpdate.facebook,
      phone: this.dataUpdate.phone,
      email: this.dataUpdate.email
    });
  }
}
