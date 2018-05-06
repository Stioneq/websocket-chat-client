import {Type} from '@angular/core/core';
import {PublicMessageComponent} from './public-message/public-message.component';
import {MessageView} from './message-view';
import {PrivateMessageComponent} from './private-message/private-message.component';
import {SystemMessageComponent} from './system-message/system-message.component';

const MAP = {
  'public': PublicMessageComponent,
  'private': PrivateMessageComponent,
  'system': SystemMessageComponent
};

export const getMessageViewType = (msgType: string) => MAP[msgType];


export const isDisplayableType = (msgType: string) => !!MAP[msgType];
