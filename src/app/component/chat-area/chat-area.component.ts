import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../model/message';
import {Subscription} from 'rxjs/Subscription';
import {MessageService} from '../../service/message.service';
import {isDisplayableType} from './message/message-type-converter.utils';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.styl']
})
export class ChatAreaComponent implements OnInit, OnDestroy {
  messages: Array<Message> = [];
  private messageSubscription: Subscription;
  private messageHistorySubscription: Subscription;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageHistorySubscription = this.messageService.getMessages('', 0, 0).pipe(map(msg =>
      msg.map(m => Object.assign({}, m, {type: (!!m.receiver) ? 'private' : 'public'}))
  )).
    subscribe(messages => {
      this.messages.push(...messages);
    });
    this.messageSubscription = this.messageService.messages$().pipe(filter(msg => this.isDisplayableType(msg)))
      .subscribe(msg => {
        this.messages.push(msg);
      });
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.messageHistorySubscription.unsubscribe();
  }

  /**
   * Defines whether we should display the message of given type
   * @param {Message} msg
   * @returns {boolean}
   */
  isDisplayableType(msg: Message) {
    return isDisplayableType(msg.type);
  }

  isForeign(msg: Message): boolean {
    return msg.sender !== 'admin';
  }
}
