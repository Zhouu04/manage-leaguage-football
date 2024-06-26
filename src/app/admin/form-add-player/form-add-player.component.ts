import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PlayerService } from '../service/player.service';



@Component({
  selector: 'app-form-add-player',
  templateUrl: './form-add-player.component.html',
  styleUrls: ['./form-add-player.component.css'],
  
})

export class FormAddPlayerComponent implements OnInit {
    formplayer: FormGroup;

    @Input() idTeam: string;
    @Input() dataUpdate: any;
    showAlert = false;
    showUpdate = false;
  
    constructor(private fb: FormBuilder,
                private playerService: PlayerService) {}
  
    ngOnInit() {
      this.formplayer = this.fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        goal: ['', Validators.required],
        role: ['', Validators.required],
        assist: ['', [Validators.required]]
      });
  
      if (this.dataUpdate) {
        this.setDataUpdate();
      }
    }
  
    reset() {
      this.formplayer.reset();
    }
  
    addPlayer() {
      if (!this.formplayer.valid) {
        this.formplayer.markAllAsTouched();
        return;
      }
  
      const formData = {
        name: this.formplayer.value.name,
        age: this.formplayer.value.age,
        goal: this.formplayer.value.goal,
        role: this.formplayer.value.role,
        assist: this.formplayer.value.assist,
        idTeam: this.idTeam
      };
  
      if (this.dataUpdate) {
        const formUpdate = {
          id: this.dataUpdate.id,
          ...formData
        };
  
        this.playerService.updatePlayer(formUpdate).subscribe(data => {
          this.showUpdate = true;
        });
      } else {
        this.playerService.createPlayer(formData).subscribe(data => {
          this.showAlert = true;
        });
      }
    }
  
    setDataUpdate() {
      if (this.dataUpdate) {
        this.formplayer.patchValue({
          name: this.dataUpdate.name,
          age: this.dataUpdate.age,
          goal: this.dataUpdate.goal,
          role: this.dataUpdate.role,
          assist: this.dataUpdate.assist
        });
      }
    }
}