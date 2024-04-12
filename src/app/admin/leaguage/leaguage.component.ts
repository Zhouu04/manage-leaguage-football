import {Component, OnInit} from '@angular/core';
import {NgbNavChangeEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-leaguage',
  templateUrl: './leaguage.component.html',
  styleUrls: ['./leaguage.component.css']
})
export class LeaguageComponent implements OnInit{
  active: number = 1;
  onNavChange(changeEvent: NgbNavChangeEvent) {}

  ngOnInit() {
  }
}
