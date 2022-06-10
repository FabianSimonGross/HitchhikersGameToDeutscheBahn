import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})

export class DiceComponent implements OnInit {
  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
