import {Injectable} from '@angular/core';
import {Client, over} from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {filter, switchMap, take} from 'rxjs/operators';
import {timer} from 'rxjs/observable/timer';
import {RECONNECT_TIME} from '../utils/constants';
import {MessageService} from './message.service';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';
import {Message} from '../model/message';

@Injectable()
export class WebsocketService {
  private stompClient: Client;
  private connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private messageService: MessageService, private tokenService: TokenService) {
  }

  connect() {
    const ws = new SockJS(environment.url + '/ws?access_token=' + this.tokenService.getToken());
    this.stompClient = over(ws);

    this.stompClient.connect({}, (frame) => {
      console.log(`connected ${frame}`);
      this.connected$.next(true);
      this.listenMessages();
    }, (err) => {
      console.log(err);
      this.connected$.next(false);
      timer(RECONNECT_TIME).pipe(take(1)).subscribe(
        val => this.connect()
      );
    });
  }


  public getConnected$(): BehaviorSubject<boolean> {
    return this.connected$;
  }

  sendMessage(chatMessage: Message) {
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

  private listenMessages() {
    this.stompClient.subscribe('/topic/chat/message/public', (message) => {
      const msg = JSON.parse(message.body);
      this.messageService.notifyMessage({type: 'public', content: msg.content, date: new Date(), sender: msg.sender});
    });
    this.stompClient.subscribe('/topic/chat/message/private/admin', (message) => {
      const msg = JSON.parse(message.body);
      this.messageService.notifyMessage({type: 'private', content: msg.content, date: new Date(), sender: msg.sender});
    });
    this.stompClient.subscribe('/topic/chat/events/public', (message) => {
      const msg = JSON.parse(message.body);
      this.messageService.notifyMessage({type: msg.type, content: msg.content, date: new Date(), sender: msg.sender});
    });
  }
}
