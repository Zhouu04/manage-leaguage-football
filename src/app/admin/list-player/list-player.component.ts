import {Component, OnInit, ViewChild, Pipe, PipeTransform} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { PlayerService } from '../service/player.service';
import {ActivatedRoute} from "@angular/router";
import { FormAddPlayerComponent } from '../form-add-player/form-add-player.component';

@Component({
    selector: 'app-list-player',
    templateUrl: './list-player.component.html',
    styleUrls: ['./list-player.component.css'],

  })

export class ListPlayerComponent implements OnInit{
    players$: any;
    idTeam : any;
    idPlayer : any;
    topPlayers$: any;
 
    closeResult: any;
    dataUpdate: any;
    
    team: any;
  
    @ViewChild(FormAddPlayerComponent) formAddPlayerComponent: FormAddPlayerComponent;
  
    constructor(private router: ActivatedRoute, private playerService: PlayerService, private modalService: NgbModal,) {
    }
  
    ngOnInit() {
      let id: string | null = this.router.snapshot.paramMap.get('id');
      console.log(id);
      this.idTeam = id;
      this.playerService.getplayerByIdTeam(id).subscribe(data => {
        this.players$ = data;
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
      this.playerService.getplayerByIdTeam(this.idTeam).subscribe(
        data => {
          this.players$ = data;
          
        }
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
    deletePlayer() {
      this.playerService.deletePlayer(this.idPlayer).subscribe(data => {
        this.reloadData();
      });
  
      this.modalService.dismissAll();
    }
  
    openUpdate(content: any, players: any) {
      this.dataUpdate = players;
      this.modalService.open(content, { size: 'lg' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
  
    openDelete(content: any, playerId: string) {
      this.idPlayer =  playerId;
      this.modalService.open(content, {ariaLabelledBy: 'delete-modal'}).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
    getTopPlayers() {
      this.playerService.getPlayerByOrderGoal(this.idTeam).subscribe((data) => {
        this.topPlayers$ = data; 
        console.log(this.topPlayers$);
      });
    }

    openTopGoalModal(content: any) {
      this.getTopPlayers(); 
      this.modalService.open(content, { size: 'lg' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
    


}