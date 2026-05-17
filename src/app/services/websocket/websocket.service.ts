import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { WEBSOCKET_APP_EVENT, WEBSOCKET_APP_NAMESPACE } from '../../const/gateway.constant';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  constructor() {
    this.socket = io(`ws://localhost:3000/${WEBSOCKET_APP_NAMESPACE}`, {
      reconnectionAttempts: 5,
      transports: ['websocket'],
    });
  }

  public joinChannel(channelName: string): void {
    this.socket.emit('join', channelName);
  }

  public listenOnInfo<T>(callback: (data: T) => void): void {
    this.socket.on(WEBSOCKET_APP_EVENT, (data: T) => {
      callback(data);
    });
  }
}
