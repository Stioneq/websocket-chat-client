import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../model/message';
import {MessageView} from '../message-view';

@Component({
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.styl']
})
export class SystemMessageComponent implements OnInit, MessageView {
  @Input('msg') msg: Message;
  constructor() { }

  ngOnInit() {
  }

}
