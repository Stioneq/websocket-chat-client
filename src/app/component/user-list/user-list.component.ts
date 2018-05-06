import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from '../../service/websocket.service';
import {MessageService} from '../../service/message.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.styl']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Array<string> = [];

  constructor(private websocketService: WebsocketService, private messageService: MessageService) {
  }

  private usersSubscription;
  private userEventSubscription;

  ngOnInit() {

    this.usersSubscription = this.websocketService.getUsers$()
      .subscribe(users => this.users = users);
    this.userEventSubscription = this.messageService.messages$()
      .pipe(filter(msg => msg.type === 'JOIN' || msg.type === 'LOGOUT')).subscribe(msg => {
      switch (msg.type) {
        case 'JOIN':
          this.users.push(msg.content);
          break;
        case 'LOGOUT':
          this.users.splice(this.users.indexOf(msg.content), 1);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.userEventSubscription.unsubscribe();
  }

}
