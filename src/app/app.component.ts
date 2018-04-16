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


  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.connect();
  }


  keyPress($event) {
    if ($event.keyCode === 13) {
      this.status = 'enter';
      this.webSocketService.sendMessage($event.target.value);
      $event.target.value = '';
    } else {
      this.status = $event.keyCode;
    }
  }
}
