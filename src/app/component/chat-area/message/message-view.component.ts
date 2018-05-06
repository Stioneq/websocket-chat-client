import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {MessageViewDirective} from './message-view.directive';
import {Message} from '../../../model/message';
import {MessageView} from './message-view';
import {getMessageViewType} from './message-type-converter.utils';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.styl']
})
export class MessageViewComponent implements OnInit {
  @Input('msg') msg: Message;
  @ViewChild(MessageViewDirective) mvHost: MessageViewDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.loadComponent();
  }

  private loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(getMessageViewType(this.msg.type));

    const viewContainerRef = this.mvHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<MessageView>componentRef.instance).msg = this.msg;
  }


}
