import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../model/message';
import {WebsocketService} from '../../service/websocket.service';
import {Subscription} from 'rxjs/Subscription';
import {ChatMessage} from '../../model/chatmessage';
import {map} from 'rxjs/operators';

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
         content: msg.content,
         sender: msg.sender,
         isPrivate: !!msg.receiver,
         date: new Date()
       })))
       .subscribe(msg => this.messages.push(msg));
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

}
