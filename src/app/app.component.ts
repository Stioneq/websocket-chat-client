import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './service/websocket.service';
import {UserInfoComponent} from './component/user-info/user-info.component';
import {Observable} from 'rxjs/Observable';

import {range} from 'rxjs/observable/range';
import {delay} from 'rxjs/operator/delay';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {timer} from 'rxjs/observable/timer';
import {filter, map, take} from 'rxjs/operators';
import {interval} from 'rxjs/observable/interval';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';
import {ChatMessage} from './model/chatmessage_pb';
import {UserInfoService} from './service/user-info.service';
import {UserInfo} from './model/user-info';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  message = '';
  private reconnectTime: number;
  private userInfo: UserInfo;
  websocket$: WebSocketSubject<ChatMessage>;

  constructor(private webSocketService: WebsocketService, private userServiceService: UserInfoService) {
  }

  ngOnInit(): void {
    this.webSocketService.ws$();
    this.userServiceService.getUserInfo().pipe(filter(u => !!u)).subscribe(userInfo => {
      const chatMessage = new ChatMessage();
      chatMessage.setType(ChatMessage.MessageType.JOIN);
      chatMessage.setContent(userInfo.name);
      this.webSocketService.sendMessage(chatMessage);
    });
  }


  keyPress($event) {
    if ($event.keyCode === 13) {
      this.webSocketService.sendMessage($event.target.value);
      $event.target.value = '';
    } else {
    }
  }


}
