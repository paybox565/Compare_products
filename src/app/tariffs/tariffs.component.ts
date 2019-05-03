import { Component, OnInit, Input } from '@angular/core';
import {Tariff} from "./tariff";

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss']
})
export class TariffsComponent implements OnInit {

  @Input() tariffs: Tariff[];

  selectedTariff: Tariff;
  onSelect(tariff: Tariff): void {
    this.selectedTariff = tariff;
  }

  constructor() { }

  ngOnInit() {

  }

}
