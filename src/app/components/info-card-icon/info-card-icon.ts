import { Component, input } from '@angular/core';
import { IAppWebsocketInfo } from '../../services/websocket/models/websocket.model';

@Component({
  selector: 'app-info-card-icon',
  imports: [],
  templateUrl: './info-card-icon.html',
})
export class InfoCardIcon {
  public wsSatus = input<IAppWebsocketInfo['status']>('live');
}
