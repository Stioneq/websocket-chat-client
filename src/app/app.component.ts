import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './service/websocket.service';
import {filter, switchMap, take} from 'rxjs/operators';
import {UserInfoService} from './service/user-info.service';
import {UserInfo} from './model/user-info';
import {ChatMessage} from './model/chatmessage';
import {RECONNECT_TIME} from './utils/constants';
import {Observable} from 'rxjs/Observable';
import {timer} from 'rxjs/observable/timer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  userInfo: UserInfo;

  constructor(private webSocketService: WebsocketService, private userServiceService: UserInfoService) {
  }

  private connected$ = this.webSocketService.getConnected$();
  private progressCount: number = RECONNECT_TIME;

  ngOnInit(): void {
    this.getUserInfo();
    this.userInfo = {name: 'Hello', icon: 'world'};



    /*this.connected$
      .pipe(filter(con => con),
        switchMap(con => this.userServiceService.getUserInfo()),
        filter(u => !!u))
      .subscribe((userInfo) => {
        const chatMessage = new ChatMessage();
        chatMessage.content = 'hello world';
        chatMessage.sender = 'admin';
        this.webSocketService.sendMessage(chatMessage);
        this.userInfo = userInfo;
      });*/
  }

  private getUserInfo() {
    this.userServiceService.getUserInfo().subscribe((userInfo) => {
      console.log(this.userInfo);
      this.webSocketService.connect();
    }, (err) => {
      timer(RECONNECT_TIME).pipe(take(1)).subscribe(
        val => this.getUserInfo()
    );
    });
  }
}
