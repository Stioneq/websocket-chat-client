import {Injectable} from '@angular/core';
import {Client, over} from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ChatMessage} from '../model/chatmessage';
import {Observable} from 'rxjs/Observable';
import {filter, switchMap, take} from 'rxjs/operators';
import {timer} from 'rxjs/observable/timer';
import {RECONNECT_TIME} from '../utils/constants';

@Injectable()
export class WebsocketService {
  private stompClient: Client;
  private connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  connect() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = over(ws);

    this.stompClient.connect({Authorization: `Basic ${btoa('admin:admin')}`}, (frame) => {
      console.log(`connected ${frame}`);
      this.connected$.next(true);
    }, (err) => {
      this.connected$.next(false);
      timer(RECONNECT_TIME).pipe(take(1)).subscribe(
        val => this.connect()
      );
    });
  }


  public getConnected$(): BehaviorSubject<boolean> {
    return this.connected$;
  }

  sendMessage(chatMessage: ChatMessage) {
    this.stompClient.send('/app/chat/message/public', {}, JSON.stringify(chatMessage));
  }

  getUsers$(): Observable<any> {
    return this.getConnected$().pipe(filter(a => a), switchMap(a => new Observable(observer => {
      this.stompClient.subscribe('/app/chat/users', (message) => {
        observer.next(JSON.parse(message.body));
        observer.complete();
      });
    })));
  }

  getMessages$(): Observable<ChatMessage> {
    return this.getConnected$().pipe(filter(a => a), switchMap(a => new Observable((observer) => {
      this.stompClient.subscribe('/topic/chat/message/public', (message) => {
        observer.next(JSON.parse(message.body));
      });
      this.stompClient.subscribe('/topic/chat/message/private/admin', (message) => {
        observer.next(JSON.parse(message.body));
      });
    })));
  }
}
