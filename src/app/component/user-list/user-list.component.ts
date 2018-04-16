import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from '../../service/websocket.service';
import {EventType} from '../../model/user-event';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.styl']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Array<string> = [];

  constructor(private websocketService: WebsocketService) {
  }

  private usersSubscription;
  private userEventSubscription;

  ngOnInit() {
    this.usersSubscription  = this.websocketService.getUsers$().subscribe(users => this.users = users);;
    this.userEventSubscription = this.websocketService.getUserEvent$().subscribe(event => {
      switch (event.event) {
        case EventType.JOIN:
          this.users.push(event.name);
          break;
        case EventType.LOGOUT:
          this.users.splice(this.users.indexOf(event.name), 1);
          break;
      }
    });
  }
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.userEventSubscription.unsubscribe();
  }

}
