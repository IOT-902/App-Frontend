import { Component, computed, effect, input, linkedSignal, signal } from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { ISensorLocalisation } from '../../services/sensor-data/models/sensor-data.model';

const MAP_DEFAULT_CENTER: google.maps.LatLngLiteral = {
  lat: 0,
  lng: 0,
};

const MAP_DEFAULT_ZOOM = 11;

@Component({
  selector: 'app-map',
  imports: [GoogleMap, MapAdvancedMarker],
  templateUrl: './map.html',
})
export class AppMap {
  public data = input.required<ISensorLocalisation[] | undefined>();

  public displayedMarkers = signal<ISensorLocalisation[]>([]);

  public mapId = '7cda90cb2eac9d6097978580';

  public mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
  };

  public zoom = MAP_DEFAULT_ZOOM;

  constructor() {
    effect(() => {
      this._refreshMarkers(this.data());
    });
  }

  public currentMarker = computed<google.maps.LatLngLiteral | undefined>(() => {
    const last = this.data()?.at(-1);

    if (!last) return undefined;

    return {
      lat: last.latitude,
      lng: last.longitude,
    };
  });

  public center = linkedSignal<google.maps.LatLngLiteral>(
    () => this.currentMarker() ?? MAP_DEFAULT_CENTER,
  );

  public getMarkerPosition(marker: ISensorLocalisation): google.maps.LatLngLiteral {
    return {
      lat: marker.latitude,
      lng: marker.longitude,
    };
  }

  public getMarkerOptions(
    isLast: boolean,
    marker: ISensorLocalisation,
  ): google.maps.marker.AdvancedMarkerElementOptions {
    console.log('dd:', marker);
    return {
      title: new Date(marker.time).toLocaleString('fr-FR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      content: new google.maps.marker.PinElement({
        background: isLast ? '#ef4444' : '#6b7280',
        borderColor: isLast ? '#ef4444' : '#000000',
        glyphColor: '#ffffff',
        scale: isLast ? 1.1 : 0.7,
      }),
    };
  }

  public moveMap(event: google.maps.MapMouseEvent): void {
    const position = event.latLng?.toJSON();

    if (position) {
      this.center.set(position);
    }
  }

  private _refreshMarkers(markers: ISensorLocalisation[] | undefined): void {
    this.displayedMarkers.set([]);

    queueMicrotask(() => {
      this.displayedMarkers.set(markers ?? []);
    });
  }
}
