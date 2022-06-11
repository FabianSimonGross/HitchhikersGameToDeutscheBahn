import {Component} from '@angular/core';
import {environment} from "../environments/environment";
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

  currentStationArray: any = [];
  areaStationsArray: any = [];


  constructor(private http: HttpClient, private service: LocationService) {
    service.getPosition().then(pos => {
      this.getZipCode(pos.lat, pos.lng).subscribe(zipResponse => {
        this.getStationsByZip(zipResponse.address.postcode).subscribe(stationResponse => {
          this.currentStationArray = stationResponse;
          console.log(stationResponse[0].ds100)
        });
        this.getStationsByStartOfZip(zipResponse.address.postcode).subscribe(areaStationResponse => {
          this.areaStationsArray = areaStationResponse;
        })
      })
    })
  }

  getZipCode(lat: number, lon: number): Observable<any> {
    return this.http.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
  }

  getStationsByZip(zipCode: string): Observable<any> {
    return this.http.get(`${environment.uri}/stations?zipCode=${zipCode}`);
  }

  getStationsByStartOfZip(zipCode: string): Observable<any> {
    return this.http.get(`${environment.uri}/stations?zipCode=${zipCode.substring(0,2)}`);
  }
}

