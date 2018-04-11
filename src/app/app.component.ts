import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './service/websocket.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'app';
  status = '';
  users$: Observable<string>;

  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.connect();
    this.users$ = this.webSocketService.getUsers$();
  }


  keyPress($event) {
    if ($event.keyCode === 13) {
      this.status = 'enter';
      $event.target.value = '';
      this.webSocketService.sendMessage($event.target.value);
    } else {
      this.status = $event.keyCode;
    }
  }
}
