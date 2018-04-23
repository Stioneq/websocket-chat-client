import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './service/websocket.service';
import {combineLatest, filter, switchMap, take} from 'rxjs/operators';
import {ChatMessage} from './model/chatmessage_pb';
import {UserInfoService} from './service/user-info.service';
import {UserInfo} from './model/user-info';
import {createSendMessage} from './utils/message-utils';
import {pipe} from 'rxjs/util/pipe';
import {switchMapTo} from 'rxjs/operator/switchMapTo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  userInfo: UserInfo;

  constructor(private webSocketService: WebsocketService, private userServiceService: UserInfoService) {
  }

  ngOnInit(): void {
    this.userInfo = {name: 'Hello', icon: 'world'};
    this.webSocketService.ws$();


    this.webSocketService.getConnected$()
      .pipe(filter(con => con),
        switchMap(con => this.userServiceService.getUserInfo()),
        filter(u => !!u))
        .subscribe((userInfo) => {
          const chatMessage = new ChatMessage();
          chatMessage.setType(ChatMessage.MessageType.JOIN);
          chatMessage.setSender(userInfo.name);
          this.webSocketService.sendMessage(chatMessage);
          this.userInfo = userInfo;
        });
  }
}
