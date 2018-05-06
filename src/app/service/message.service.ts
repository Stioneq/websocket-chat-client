import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Message} from '../model/message';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * This service is used to manage messages for chat-area
 * E.g User x send us message and we get it using websockets
 * then we should redirect it to chat-area using this service
 */
@Injectable()
export class MessageService {

  private messagesSubject: Subject<Message> = new Subject<Message>();

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Notify observers with message
   * @param {Message} message
   */
  notifyMessage(message: Message) {
    this.messagesSubject.next(message);
  }

  /**
   * @returns {Observable<Message>} observable for new messages
   */
  messages$(): Observable<Message> {
    return this.messagesSubject;
  }

  getMessages(channelName: string, page: number, pageSize: number) {
    return this.httpClient.get<Message[]>(environment.url + '/api/messages');
  }
}
