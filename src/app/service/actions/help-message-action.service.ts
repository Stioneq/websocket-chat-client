import {Injectable} from '@angular/core';
import {MessageAction} from '../../model/message-action';
import {MessageService} from '../message.service';

@Injectable()
export class HelpMessageAction implements MessageAction {
  shortcut = '/help';
  tooltip = 'Type /help to get information about commands';


  constructor(private messageService: MessageService) {
  }

  action(msg): void {
    this.messageService.notifyMessage({content: 'Help message', type: 'system'});
  }
}
