import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {LocationService} from "./services/location.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LocationService]
})


export class AppComponent {
  title = 'DeutscheBahnHitchhiker';

  areaStations: any = [];
  maxStationsToGo: number = 0;


  constructor(private http: HttpClient, private service: LocationService) {
    service.getPosition().then(position => {

      this.getStationByLatLng(position.lat, position.lng).subscribe(stationResponse => {
        this.areaStations = stationResponse;

        this.getDepartureBoard(stationResponse[0].evaNumber).subscribe(departureBoardResponse => {

          this.getTrainNextStops(departureBoardResponse[0].jid).subscribe(nextTrainSpotsResponse => {

            this.maxStationsToGo = this.getAmountOfStopsUntilEnd(stationResponse[0].name, nextTrainSpotsResponse.stops)
          })
        })
      })
    })
  }

  getStationByLatLng(lat: number, lng: number): Observable<any> {
    console.log(`https://marudor.de/api/stopPlace/v1/geoSearch?lat=${lat}&lng=${lng}`);
    return this.http.get(`https://marudor.de/api/stopPlace/v1/geoSearch?lat=${lat}&lng=${lng}`);
  }

  getDepartureBoard(stationId: string): Observable<any> {
    console.log(`https://marudor.de/api/hafas/v2/departureStationBoard?station=${stationId}`);
    return this.http.get(`https://marudor.de/api/hafas/v2/departureStationBoard?station=${stationId}`);
  }

  getTrainNextStops(trainId: string): Observable<any> {
    console.log(`https://marudor.de/api/hafas/v2/journeyDetails?jid=${trainId}`);
    return this.http.get(`https://marudor.de/api/hafas/v2/journeyDetails?jid=${trainId}`);
  }

  getAmountOfStopsUntilEnd(waitingStop: string, allStops: []) {
    let stopBefore: boolean = true;
    let integer: number = 1;

    for (let stop of allStops) {

      if(stop["station"]["title"] == waitingStop) {
        stopBefore = false;
      }

      if(!stopBefore) {
        integer++;
      }
    }

    return integer;
  }

}

