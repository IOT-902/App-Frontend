import { Component, computed, input } from '@angular/core';
import { IAppWebsocketInfo } from '../../../services/websocket/models/websocket.model';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.html',
})
export class Skeleton {
  public className = input<string>();
  public animated = input<boolean>(true);
  public wsStatus = input<IAppWebsocketInfo['status']>('live');

  public classes = computed(() => {
    return `
    rounded-full 
      ${this.wsStatus() === 'live' ? 'bg-gray-200' : 'bg-red-50'}
      ${this.animated() ? 'animate-pulse' : ''}
      ${this.className()}
    `;
  });
}
