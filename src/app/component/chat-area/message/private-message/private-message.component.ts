import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../model/message';
import {MessageView} from '../message-view';

@Component({
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.styl']
})
export class PrivateMessageComponent implements OnInit, MessageView {
  @Input('msg') msg: Message;
  constructor() { }

  ngOnInit() {
  }

}
