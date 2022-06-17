import {Component, Input} from '@angular/core';
import StationsJSON from "../../assets/stations.json";


@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})

export class DiceComponent {
  @Input() areaStations: any = [];
  @Input() maxStationsToGo: number = 0;

  isLoading: boolean = true;

  track: number = -1;
  stationsToRide: number = -1;

  ngOnChanges() {
    if(this.areaStations.length == 0) {
      this.isLoading = true;
      return;
    }
    this.isLoading = false;

    this.track = this.getRandomNumberInRange(1, this.getAmountOfTracks());
    this.stationsToRide = this.getRandomNumberInRange(1, this.maxStationsToGo);
  }

  constructor() {
  }

  getAmountOfTracks() : number {
    let amt: number = 2;

    for (const station of StationsJSON) {
      if(station.ds100 == this.areaStations[0].identifier.ril100) {
        amt = station.platforms.length + 1;
      }
    }
    console.log("AMT: " + amt);
    return amt;
  }

  getRandomNumberInRange(min: number, max: number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log("MIN: " + min + " MAX: " + max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
