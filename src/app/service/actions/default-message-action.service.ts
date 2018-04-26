import {Injectable} from '@angular/core';
import {MessageAction} from '../../model/message-action';
import {WebsocketService} from '../websocket.service';
import {createSendMessage} from '../../utils/message-utils';

@Injectable()
export class DefaultMessageAction implements MessageAction {
  shortcut = '/help';
  tooltip = 'Type /help to get information about commands';


  constructor(private websocketService: WebsocketService) {
  }

  action(msg): void {

    this.websocketService.sendMessage(createSendMessage(msg, 'admin', ''));
  }
}
