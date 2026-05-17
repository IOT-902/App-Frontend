import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILocalisationCity } from './models/localisation-city';
import { Observable } from 'rxjs';

const API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  private _http = inject(HttpClient);

  public getCityByGeolocalisation(
    latitude: number,
    longitude: number,
  ): Observable<ILocalisationCity> {
    return this._http.get<ILocalisationCity>(API_URL, {
      params: { latitude: latitude, longitude: longitude, localityLanguage: 'fr' },
    });
  }
}
