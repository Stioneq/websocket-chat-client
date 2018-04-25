import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageAction} from '../model/message-action';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class MessageActionService {

  private actions: ReplaySubject<MessageAction[]>;

  constructor(private httpClient: HttpClient) {

  }


  getActions(): Observable<MessageAction[]> {

    if (!this.actions) {
      //this.actions = this.httpClient.get<MessageAction[]>('./assets/json/actions.json').pipe(publishReplay(1), refCount());
    }
    return this.actions;

  }

  findActionsByText(value: any): Observable<MessageAction[]> {
    console.log(value);
    return this.getActions();
  }
}
