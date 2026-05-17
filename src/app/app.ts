import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoCard } from './components/info-card/info-card';
import { IInfoCardOption, InfoCardTypeEnum } from './components/info-card/models';
import { LocalisationService } from './services/localisation/localisation';
import { ILocalisationCity } from './services/localisation/models/localisation-city';
import { SensorDataService } from './services/sensor-data/sensor-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfoCard],
  templateUrl: './app.html',
})
export class App {
  protected readonly InfoCardTypeEnum = InfoCardTypeEnum;

  constructor(private readonly _sensorDataService: SensorDataService) {}

  public get temperatureData(): Signal<IInfoCardOption | undefined> {
    return this._sensorDataService.temperatureData;
  }
  public get pollutionAData(): Signal<IInfoCardOption | undefined> {
    return this._sensorDataService.pollutionAData;
  }
  public get pollutionBData(): Signal<IInfoCardOption | undefined> {
    return this._sensorDataService.pollutionBData;
  }
  public get localisation(): Signal<ILocalisationCity | undefined> {
    return this._sensorDataService.localisationData;
  }
}
