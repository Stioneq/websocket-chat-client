import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../model/message';
import {WebsocketService} from '../../service/websocket.service';
import {Subscription} from 'rxjs/Subscription';
import {pipe} from 'rxjs/util/pipe';
import {map} from 'rxjs/operators';
import {ChatMessage} from '../../model/chatmessage_pb';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.styl']
})
export class ChatAreaComponent implements OnInit, OnDestroy {
  private messages: Array<Message> = [];
  private messageSubscription: Subscription;

  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit() {
    this.messageSubscription = this.websocketService.getMessages$()
      .pipe(map<ChatMessage, Message>(msg => ({
        content: msg.getContent(),
        sender: msg.getSender(),
        isPrivate: !!msg.getReceiver(),
        date: new Date()
      })))
      .subscribe(msg => this.messages.push(msg));
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

}
