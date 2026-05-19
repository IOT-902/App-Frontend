import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsLoaderService {
  public load(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('google-maps')) {
        resolve();
        return;
      }

      const script = document.createElement('script');

      script.id = 'google-maps';

      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=marker`;

      script.async = true;
      script.defer = true;

      script.onload = () => resolve();

      script.onerror = () => reject();

      document.head.appendChild(script);
    });
  }
}
