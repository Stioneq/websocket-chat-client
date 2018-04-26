import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {createSendMessage} from '../../utils/message-utils';
import {WebsocketService} from '../../service/websocket.service';
import {UserInfoService} from '../../service/user-info.service';
import {MessageActionsLocatorService} from '../../service/message-actions-locator.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.styl']
})
export class ChatInputComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  private tooltipText;

  constructor(private webSocketService: WebsocketService, private userInfoService: UserInfoService, private messageActionLocator: MessageActionsLocatorService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    /*fromEvent(this.input.nativeElement, 'keypress').pipe(
      debounceTime(100),
      map(event => event.target.value),
    switchMap(value => this.tooltipService.get(value))).subscribe((result) => {
      console.log(result);
      this.tooltipText = result;
    });*/
  }

  keyPress($event) {
    if ($event.keyCode === 13) {
      const value = $event.target.value;
      this.messageActionLocator.getActionByMsg(value).action(value);
      //this.webSocketService.sendMessage(createSendMessage(value, 'admin', ''));
      $event.target.value = '';
    } else {
    }
  }
}
