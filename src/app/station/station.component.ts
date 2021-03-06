import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})

export class StationComponent {
  @Input() areaStations: any = [];
  stationControl = new FormControl('');
  filteredStations: Observable<any[]>;

  constructor() {
    this.filteredStations = this.stationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.areaStations.filter((station: any) => station.name.toLowerCase().includes(filterValue));
  }
}


