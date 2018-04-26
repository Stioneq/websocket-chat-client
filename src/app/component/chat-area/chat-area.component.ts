import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../model/message';
import {WebsocketService} from '../../service/websocket.service';
import {Subscription} from 'rxjs/Subscription';
import {ChatMessage} from '../../model/chatmessage';
import {map} from 'rxjs/operators';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.styl']
})
export class ChatAreaComponent implements OnInit, OnDestroy {
  messages: Array<Message> = [];
  private messageSubscription: Subscription;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
     this.messageSubscription = this.messageService.messages$()
       .subscribe(msg => {
         this.messages.push(msg);
       });
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

}
