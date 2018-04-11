import {Injectable} from '@angular/core';
import {ChatMessage} from '../model/chatmessage_pb';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class WebsocketService {
  private socket;
  private userSubject$: Subject<string> = new Subject<string>();

  constructor() {
  }

  connect() {
    this.socket = new WebSocket('ws://localhost:8080/ws');
    this.socket.onclose = (event) => this.onClose(event);
    this.socket.onmessage = (event) => this.onMessage(event);
    this.socket.onopen = (event) => this.onOpen();
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
    debugger;
    const msg = ChatMessage.deserializeBinary(new Uint8Array(event.data));
    if (msg.getType() === ChatMessage.MessageType.GET_USERS) {
      msg.getContent().split(',').forEach(s => this.userSubject$.next(s));
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


  getUsers$(): Observable<string> {
    return this.userSubject$;
  }
}
