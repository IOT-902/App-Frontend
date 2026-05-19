import { Injectable, Signal, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {
  WEBSOCKET_APP_EVENT,
  WEBSOCKET_APP_NAMESPACE,
  WEBSOCKET_APP_ROOM,
} from '../../const/gateway.constant';
import { IAppWebsocketInfo } from './models/websocket.model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  private _websocketStatus = signal<IAppWebsocketInfo['status']>('off');

  constructor() {
    this.socket = io(`ws://localhost:3000/${WEBSOCKET_APP_NAMESPACE}`, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      this._websocketStatus.set('live');
      this._joinChannel(WEBSOCKET_APP_ROOM);
    });

    this.socket.on('disconnect', () => {
      this._websocketStatus.set('off');
    });

    this.socket.on('connect_error', (err) => {
      this._websocketStatus.set('off');
    });
  }

  public getWebsocketStatut(): Signal<IAppWebsocketInfo['status']> {
    return this._websocketStatus.asReadonly();
  }

  private _joinChannel(channelName: string): void {
    this.socket.emit('join', channelName);
  }

  public listenOnInfo<T>(callback: (data: T) => void): void {
    this.socket.on(WEBSOCKET_APP_EVENT, (data: T) => {
      callback(data);
    });
  }
}
