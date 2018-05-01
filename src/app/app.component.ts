import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './service/websocket.service';
import {filter, switchMap, take} from 'rxjs/operators';
import {UserInfo} from './model/user-info';
import {ChatMessage} from './model/chatmessage';
import {RECONNECT_TIME} from './utils/constants';
import {Observable} from 'rxjs/Observable';
import {timer} from 'rxjs/observable/timer';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  userInfo: UserInfo;

  constructor(private webSocketService: WebsocketService,
              private auth: AuthService, private userService: UserService, private router: Router) {
  }

  private connected$ = this.webSocketService.getConnected$();
  private progressCount: number = RECONNECT_TIME;
  authenticated = false;

  ngOnInit(): void {
    this.auth.isAuthenticated$().subscribe(token => this.authenticated = !!token);
    //  this.userService.getUser().subscribe(e => console.log(e));

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

  public logout() {
    this.auth.logout();
    location.reload();
  }

  private getUserInfo() {
    /*    this.webSocketService.connect();*/
  }
}
