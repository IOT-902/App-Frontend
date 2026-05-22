import { Component, computed, inject, signal } from '@angular/core';
import { InfoCard } from './components/info-card/info-card';
import { IInfoCardOption, InfoCardTypeEnum } from './components/info-card/models';
import { ILocalisationCity } from './services/localisation/models/localisation-city';
import { SensorDataService } from './services/sensor-data/sensor-data';
import { AppHeader } from './components/header/header';
import { WebsocketService } from './services/websocket/websocket.service';
import { IAppWebsocketInfo } from './services/websocket/models/websocket.model';
import { AppMap } from './components/map/map';
import { ISensorLocalisation } from './services/sensor-data/models/sensor-data.model';
import { AppDetailedChartComponent } from './components/detailed-chart/detailed-chart';

type PanelType = 'map' | 'temperature' | 'pollutionA' | 'pollutionB';

const PANELS: { key: PanelType; type?: InfoCardTypeEnum }[] = [
  { key: 'map', type: InfoCardTypeEnum.localisation },
  { key: 'temperature', type: InfoCardTypeEnum.temperature },
  { key: 'pollutionA', type: InfoCardTypeEnum.pollutionA },
  { key: 'pollutionB', type: InfoCardTypeEnum.pollutionB },
];

@Component({
  selector: 'app-root',
  imports: [InfoCard, AppHeader, AppMap, AppDetailedChartComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly InfoCardTypeEnum = InfoCardTypeEnum;
  protected readonly PANELS = PANELS;

  private _openedPanel = signal<PanelType | null>(null);
  public readonly openedPanel = this._openedPanel.asReadonly();
  private readonly _websocketService = inject(WebsocketService);
  private readonly _sensorDataService = inject(SensorDataService);

  public readonly websocketStatus = this._websocketService.getWebsocketStatut();
  public readonly localisationData = this._sensorDataService.localisationData;
  public readonly localisationHistoryData = this._sensorDataService.localisationHistoryData;

  public readonly sensorCards = computed<Record<PanelType, IInfoCardOption | undefined>>(() => ({
    temperature: this._sensorDataService.temperatureData(),
    pollutionA: this._sensorDataService.pollutionAData(),
    pollutionB: this._sensorDataService.pollutionBData(),
    map: undefined,
  }));

  // UI STATE
  public isPanelOpen(panel: PanelType) {
    return computed(() => this._openedPanel() === panel);
  }

  public togglePanel(panel: PanelType): void {
    if (this.websocketStatus() === 'off' || !this.localisationData()) return;

    this._openedPanel.update((current) => (current === panel ? null : panel));
  }

  // helpers template-safe
  public getCardData(panel: PanelType) {
    return this.sensorCards()[panel];
  }
}
