import {Component, OnInit} from '@angular/core';
import {TariffService} from "./tariffs/tariff.service";
import {Tariff} from "./tariffs/tariff";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tariffs: Tariff[];
  currentConsumption: number;
  ready: boolean = false;
  spinner: boolean;
  warnText: string;

  constructor(private tariffService: TariffService) { }

  ngOnInit() {
    // Just for showing button disabled timer
    setTimeout(() => {
      this.getTariffs();
    }, 500);
  }

  getTariffs(): void {
    this.tariffService.getTariffs()
        .subscribe(tariffs => this.tariffs = tariffs,
        error=> this.warnText = error.body.error
    );
  }

  getConsumption(consumption: number, tariff: Tariff): number{

    this.ready = false;
    this.spinner = true;

    let tariffBase = tariff.baseCost,
        tariffConsumption = tariff.consumptionCost/100,
        tariffType = tariff.type,
        tariffLimit: number,
        consumptionFinal: number;

    if(tariffType === 'base'){
      consumptionFinal = tariffBase*12 + consumption*tariffConsumption;
    }
    else if(tariffType === 'package'){
      tariffLimit = tariff.limit;

      if(consumption > tariffLimit){
        consumptionFinal = tariffBase + (consumption - tariffLimit)*tariffConsumption;
      }
      else {
        consumptionFinal = tariffBase;
      }
    }

    // Just for spinner timer
    setTimeout(() => {
      this.ready = consumption > 0;
      this.spinner = false;
    }, 1000);

    return Math.round(consumptionFinal);
  }

  addAnnualCost(): void {
    this.tariffs.forEach((item: Tariff)=>{
      item.annualCost = this.getConsumption(this.currentConsumption, item);
    });
  }

  getCurrentConsumption(): void{
    this.addAnnualCost();
    this.tariffs.sort(function (a, b) {
      return a.annualCost - b.annualCost;
    });
  }
}
