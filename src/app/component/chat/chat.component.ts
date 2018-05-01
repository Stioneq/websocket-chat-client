import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {WebsocketService} from '../../service/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.styl']
})
export class ChatComponent implements OnInit {
  userInfo;

  constructor(private userService: UserService, private websocketService: WebsocketService) {
  }

  ngOnInit() {
    this.websocketService.connect();
    this.userService.getUser().subscribe(val => {
      this.userInfo = val;
    });
  }

}
