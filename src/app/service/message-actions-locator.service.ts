import {Inject, Injectable} from '@angular/core';
import {MessageAction} from '../model/message-action';
import {DefaultMessageAction} from './actions/default-message-action.service';

@Injectable()
export class MessageActionsLocatorService {

  private servicesMap: Map<string, MessageAction>;

  constructor(@Inject('MessageAction') services: MessageAction[], private defaultMessageAction: DefaultMessageAction) {
    this.servicesMap = services.reduce((l, r) => l.set(r.shortcut, r), new Map());
  }


  getActionByMsg(msg: string): MessageAction {
    const prefix = msg.split(' ')[0];

    return this.servicesMap.get(prefix) || this.defaultMessageAction;
  }
}
