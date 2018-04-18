import {Injectable} from '@angular/core';
import {ChatMessage} from '../model/chatmessage_pb';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Message} from '../model/message';
import {EventType, UserEvent} from '../model/user-event';
import {UserInfoService} from './user-info.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {filter} from 'rxjs/operators';


@Injectable()
export class WebsocketService {
  private socket;
  private connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private messages$: Subject<ChatMessage> = new Subject<ChatMessage>();

  constructor(private userInfoService: UserInfoService) {
  }

  ws$() {
    console.log('Create observable');
    this.socket = new WebSocket('ws://localhost:8080/ws');
    this.socket.binaryType = 'arraybuffer';
    this.socket.onclose = () => this.onClose();
    this.socket.onmessage = (event) => {
      this.messages$.next(this.getMessage(event));
    };
    this.socket.onopen = () => this.connected$.next(true);
    this.socket.onerror = (err) => this.onError(err);
  }

  sendMessage(msg: ChatMessage) {
    if (this.isOpened()) {
      this.socket.send(msg.serializeBinary());
    }
  }

  private onClose() {
    if (this.isOpened()) {
      console.log('Closed');
      this.connected$.next(false);
      this.reconnect();
    }
  }

  private getMessage(event: any): ChatMessage {
    return ChatMessage.deserializeBinary(new Uint8Array(event.data));
  }

  /*private onMessage(event: any) {
    const msg = ChatMessage.deserializeBinary(new Uint8Array(event.data));
    if (msg.getType() === ChatMessage.MessageType.GET_USERS) {
      this.userSubject$.next(msg.getContent().split(','));
    } else if (msg.getType() === ChatMessage.MessageType.SEND) {
      this.messageSubject$.next({content: msg.getContent(), sender: msg.getSender(), isPrivate: !!msg.getReceiver(), date: new Date()});
    } else if (msg.getType() === ChatMessage.MessageType.JOIN || msg.getType() === ChatMessage.MessageType.LOGOUT) {
      this.userEventSubject$.next({
        event: (msg.getType() === ChatMessage.MessageType.JOIN ? EventType.JOIN : EventType.LOGOUT),
        name: msg.getContent()
      });
    }
    console.log(event.data);
  }*/

  /*  private onOpen() {
      this.isSocketOpened$.next(true);
      this.userInfoService.getUserInfo().subscribe(val => {
        console.log('Connected');
        const msg = new ChatMessage();
        msg.setType(ChatMessage.MessageType.JOIN);
        msg.setSender('stioneq');
        this.socket.send(msg.serializeBinary());
        this.getUsers();
      });
    }*/

  private getUsers() {
    if (this.isOpened()) {
      const msg = new ChatMessage();
      msg.setType(ChatMessage.MessageType.GET_USERS);
      msg.setSender('stioneq');
      this.socket.send(msg.serializeBinary());
    }
  }


  getUsers$(): Observable<ChatMessage> {
    return this.messages$.pipe(filter(msg => msg.getType() === ChatMessage.MessageType.GET_USERS));
  }

  getMessages$() {
    return this.messages$.pipe(filter(msg => msg.getType() === ChatMessage.MessageType.SEND));
  }

  getUserEvent$() {
    return this.messages$
      .pipe(filter(msg => msg.getType() === ChatMessage.MessageType.JOIN || msg.getType() === ChatMessage.MessageType.LOGOUT));
  }
  /*

    private isOpened() {
      return this.isSocketOpened$.getValue();
    }

    isOpened$() {
      return this.isSocketOpened$;
    }
  */

  private onError(err: any) {
    if (this.socket.readyState !== 1) {
      this.connected$.next(false);
      this.reconnect();
    }
  }

  private reconnect() {
    setTimeout(() => this.ws$(), 3000);
  }

  private isOpened() {
    return this.connected$.getValue();
  }
}
