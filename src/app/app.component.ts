import {Component} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {LocationService} from "./services/location.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ LocationService ]
})



export class AppComponent {
  title = 'DeutscheBahnHitchhiker';

  stations: any = [];

  constructor(private http: HttpClient, private service: LocationService) {
    this.getStations().subscribe(response => {
      this.stations = response;
      //console.log(this.stations[0])
      //console.log(service.getPosition())
    })
  }


  getStations(): Observable<any> {
    return this.http.get(`${environment.uri}/stations`);
  }


}

