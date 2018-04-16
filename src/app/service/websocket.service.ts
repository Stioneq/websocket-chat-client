import {Injectable} from '@angular/core';
import {ChatMessage} from '../model/chatmessage_pb';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Message} from '../model/message';
import {EventType, UserEvent} from '../model/user-event';


@Injectable()
export class WebsocketService {
  private socket;
  private userSubject$: Subject<Array<string>> = new Subject<Array<string>>();
  private userEventSubject$: Subject<UserEvent> = new Subject<UserEvent>();
  private messageSubject$: Subject<Message> = new Subject<Message>();

  constructor() {
  }

  connect() {
    this.socket = new WebSocket('ws://localhost:8080/ws');
    this.socket.binaryType = 'arraybuffer';
    this.socket.onclose = (event) => this.onClose(event);
    this.socket.onmessage = (event) => this.onMessage(event);
    this.socket.onopen = () => this.onOpen();
  }

  sendMessage(text) {
    console.log('Send ' + text);
    const msg = new ChatMessage();
    msg.setContent(text);
    msg.setType(ChatMessage.MessageType.SEND);
    msg.setSender('stioneq');
    this.socket.send(msg.serializeBinary());
  }

  private onClose(event: any) {
    console.log('Closed');
  }

  private onMessage(event: any) {
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
  }

  private onOpen() {
    console.log('Connected');
    const msg = new ChatMessage();
    msg.setType(ChatMessage.MessageType.JOIN);
    msg.setSender('stioneq');
    this.socket.send(msg.serializeBinary());
    this.getUsers();
  }

  private getUsers() {
    const msg = new ChatMessage();
    msg.setType(ChatMessage.MessageType.GET_USERS);
    msg.setSender('stioneq');
    this.socket.send(msg.serializeBinary());
  }


  getUsers$(): Observable<Array<string>> {
    return this.userSubject$;
  }

  getMessages$() {
    return this.messageSubject$;
  }
  getUserEvent$(){
    return this.userEventSubject$;
  }
}
