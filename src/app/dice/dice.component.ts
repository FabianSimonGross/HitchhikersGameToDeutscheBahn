import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})

export class DiceComponent {
  isLoading: boolean = false;

  @Input() stations: any = [];

  constructor() {
    console.log("Fuck " + this.stations)

  }
}
