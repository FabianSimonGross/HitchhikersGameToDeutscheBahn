import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})

export class DiceComponent {
  @Input() stations: any = [];
  isLoading: boolean = true;

  track: number = 0;
  stationsToRide: number = 0;

  ngOnChanges() {
    if(this.stations.length == 0) {
      this.isLoading = true;
      return;
    }
    this.isLoading = false;

    let randomStation = Math.floor(Math.random() * this.stations.length);
    this.track = Math.floor(Math.random() * this.stations[randomStation].platforms.length) + 1;

    this.stationsToRide = Math.floor(Math.random() * 7) + 1;
  }

  constructor() {
  }
}
