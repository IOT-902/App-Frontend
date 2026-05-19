import { Component, computed, signal, Signal } from '@angular/core';
import { InfoCard } from './components/info-card/info-card';
import { IInfoCardOption, InfoCardTypeEnum } from './components/info-card/models';
import { ILocalisationCity } from './services/localisation/models/localisation-city';
import { SensorDataService } from './services/sensor-data/sensor-data';
import { AppHeader } from './components/header/header';
import { WebsocketService } from './services/websocket/websocket.service';
import { IAppWebsocketInfo } from './services/websocket/models/websocket.model';
import { AppMap } from './components/map/map';
import { ISensorLocalisation } from './services/sensor-data/models/sensor-data.model';

type OpenedPanel = 'map' | 'temperature' | 'pollutionA' | 'pollutionB' | null;

@Component({
  selector: 'app-root',
  imports: [InfoCard, AppHeader, AppMap],
  templateUrl: './app.html',
})
export class App {
  protected readonly InfoCardTypeEnum = InfoCardTypeEnum;

  private _openedPanel = signal<OpenedPanel>(null);
  public readonly isMapOpened = computed(() => this._openedPanel() === 'map');
  public readonly isTemperatureDetailOpened = computed(() => this._openedPanel() === 'temperature');
  public readonly isPollutionADetailOpened = computed(() => this._openedPanel() === 'pollutionA');
  public readonly isPollutionBDetailOpened = computed(() => this._openedPanel() === 'pollutionB');

  constructor(
    private readonly _sensorDataService: SensorDataService,
    private readonly _websocketService: WebsocketService,
  ) {}

  public get temperatureData(): Signal<IInfoCardOption | undefined> {
    return this._sensorDataService.temperatureData;
  }

  public get pollutionAData(): Signal<IInfoCardOption | undefined> {
    return this._sensorDataService.pollutionAData;
  }
  public get pollutionBData(): Signal<IInfoCardOption | undefined> {
    return this._sensorDataService.pollutionBData;
  }

  public get localisationData(): Signal<ILocalisationCity | undefined> {
    return this._sensorDataService.localisationData;
  }

  public get localisationHistoryData(): Signal<ISensorLocalisation[] | undefined> {
    return this._sensorDataService.localisationHistoryData;
  }

  public get websocketStatus(): Signal<IAppWebsocketInfo['status']> {
    return this._websocketService.getWebsocketStatut();
  }

  public togglePanel(panel: OpenedPanel): void {
    if (this.websocketStatus() === 'off' || !this.localisationData()) return;
    this._openedPanel.update((current) => (current === panel ? null : panel));
  }
}
