import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[msg-view]',
})
export class MessageViewDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
