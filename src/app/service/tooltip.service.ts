import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, filter, first, map} from 'rxjs/operators';
import {empty} from 'rxjs/observable/empty';
import {MessageActionService} from './message-action.service';

@Injectable()
export class TooltipService {



  constructor(private messageActionService: MessageActionService) {
  }

  get(value: any) {
    return this.messageActionService.findActionsByText(value).pipe(map(action => action.tooltip));
  }

}
