import { Component, computed, input } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { IAppWebsocketInfo } from '../../services/websocket/models/websocket.model';

@Component({
  selector: 'app-header',
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './header.html',
})
export class AppHeader {
  public data = input.required<IAppWebsocketInfo>();
  public today = new Date();
}
