import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ILocalisationCity } from '../localisation/models/localisation-city';
import { IChartPoint, IInfoCardOption, InfoCardTypeEnum } from '../../components/info-card/models';
import { LocalisationService } from '../localisation/localisation';
import { WebsocketService } from '../websocket/websocket.service';
import { IAppHistoryInfo, ISensorLocalisation, ISensorValue } from './models/sensor-data.model';

@Injectable({
  providedIn: 'root',
})
export class SensorDataService {
  private _localisationData: WritableSignal<ILocalisationCity | undefined> = signal(undefined);
  private _localisationHistoryData: WritableSignal<ISensorLocalisation[] | undefined> =
    signal(undefined);
  private _temperatureData: WritableSignal<IInfoCardOption | undefined> = signal({
    type: InfoCardTypeEnum.temperature,
  });
  private _pollutionAData: WritableSignal<IInfoCardOption | undefined> = signal({
    type: InfoCardTypeEnum.pollutionA,
  });
  private _pollutionBData: WritableSignal<IInfoCardOption | undefined> = signal({
    type: InfoCardTypeEnum.pollutionB,
  });

  constructor(
    private readonly _localisationService: LocalisationService,
    private readonly _websocketService: WebsocketService,
  ) {
    this._websocketService.listenOnInfo<IAppHistoryInfo>((data) =>
      this._updateSensorDataFromWebsocket(data),
    );
  }

  public get localisationData(): Signal<ILocalisationCity | undefined> {
    return this._localisationData.asReadonly();
  }

  public get localisationHistoryData(): Signal<ISensorLocalisation[] | undefined> {
    return this._localisationHistoryData.asReadonly();
  }

  public get temperatureData(): Signal<IInfoCardOption | undefined> {
    return this._temperatureData.asReadonly();
  }

  public get pollutionAData(): Signal<IInfoCardOption | undefined> {
    return this._pollutionAData.asReadonly();
  }

  public get pollutionBData(): Signal<IInfoCardOption | undefined> {
    return this._pollutionBData.asReadonly();
  }

  private _getLocalisationFromData(latitude?: number, longitude?: number): void {
    if (!latitude || !longitude) {
      this._localisationData.set(undefined);
      return;
    }
    const res = this._localisationService.getCityByGeolocalisation(latitude, longitude);
    res.subscribe((val) => {
      this._localisationData.set(val);
    });
  }

  private _updateSensorDataFromWebsocket(data: IAppHistoryInfo): void {
    this._setTemperatureData(data.temperatures);
    this._setPollutionAData(data.pollutionAs);
    this._setPollutionBData(data.pollutionBs);
    this._setLocalisationData(data.localisations);
  }

  private _setLocalisationData(data: ISensorLocalisation[]): void {
    const sortedData = this._sortDataByDate(data);
    const lastLocalisation = sortedData.at(sortedData.length - 1);
    this._getLocalisationFromData(lastLocalisation?.latitude, lastLocalisation?.longitude);
    this._localisationHistoryData.set(data.slice(-5));
  }

  private _setTemperatureData(data: ISensorValue[]): void {
    const sortedData = this._sortDataByDate(data);
    const lastTemperature = sortedData.at(sortedData.length - 1);
    this._temperatureData.set({
      type: InfoCardTypeEnum.temperature,
      value: lastTemperature?.value.toString(),
      chartData: this._createLastDataChart(sortedData),
    });
  }

  private _setPollutionAData(data: ISensorValue[]): void {
    const sortedData = this._sortDataByDate(data);
    const lastPollution = sortedData.at(sortedData.length - 1);

    this._pollutionAData.set({
      type: InfoCardTypeEnum.pollutionA,
      value: lastPollution?.value.toString(),
      chartType: 'bar',
      chartData: this._createLastDataChart(sortedData),
    });
  }

  private _setPollutionBData(data: ISensorValue[]): void {
    const sortedData = this._sortDataByDate(data);
    const lastPollution = sortedData.at(sortedData.length - 1);

    this._pollutionBData.set({
      type: InfoCardTypeEnum.pollutionB,
      value: lastPollution?.value.toString(),
      chartType: 'bar',
      chartData: this._createLastDataChart(sortedData),
    });
  }

  private _sortDataByDate<T extends { time: Date }>(data: T[]): T[] {
    return data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }

  private _createLastDataChart(data: ISensorValue[]): IChartPoint[] {
    return data.slice(-5).map((i) => ({ x: new Date(i.time).toLocaleString(), y: i.value }));
  }
}
