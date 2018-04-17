import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LocalStorageService {

  private subject: Subject<[string, string]> = new Subject<[string, string]>();

  constructor() {
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
