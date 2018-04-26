import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../model/message';
import {MessageView} from '../message-view';

@Component({
  templateUrl: './public-message.component.html',
  styleUrls: ['./public-message.component.styl']
})
export class PublicMessageComponent implements OnInit, MessageView {
  @Input('msg') msg: Message;
  constructor() { }

  ngOnInit() {
  }

}
