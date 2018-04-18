import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class LocalStorageService {

  private subject: ReplaySubject<[string, string]> = new ReplaySubject<[string, string]>(20);

  constructor() {
    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);
      console.log(item);
      this.subject.next([key, item]);
    }
  }


  /**
   * Each localstorage value correspond to entityId
   * @param key
   */
  getSubscription(key: string): Observable<string> {
    return this.subject.pipe(filter(val => val[0] === key), map(val => val[1]));
  }


  setValue(key: string, value: string) {
    localStorage.setItem(key, value);
    this.subject.next([key, value]);
  }

}
