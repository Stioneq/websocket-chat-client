import {Injectable} from '@angular/core';
import {MessageAction} from '../../model/message-action';

@Injectable()
export class WhisperMessageAction implements MessageAction {
  shortcut = '/w';
  tooltip = 'Whisper message to the given client. Syntax /w <clientid> <message>';


  constructor() {
  }

  action(msg): void {

  }
}
