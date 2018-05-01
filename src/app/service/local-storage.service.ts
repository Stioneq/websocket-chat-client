import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LocalStorageService {

  private subject: BehaviorSubject<Map<string, string>>;

  constructor() {
    const storage = new Map<string, string>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);
      storage.set(key, item);
    }
    this.subject = new BehaviorSubject<Map<string, string>>(storage);
  }


  /**
   * Each localstorage value correspond to entityId
   * @param key
   */
  getSubscription(key: string): Observable<string> {
    return this.subject.pipe(map(val => val.get(key)));
  }

  /**
   * Each localstorage value correspond to entityId
   * @param key
   */
  getValue(key: string): string {
    return this.subject.getValue().get(key);
  }

  setValue(key: string, value: string) {
    localStorage.setItem(key, value);
    const storage = this.subject.getValue();
    const prevValue = storage.get(key);
    if (prevValue !== value) {
      if (!value) {
        storage.delete(key);
      } else {
        storage.set(key, value);

      }
      this.subject.next(storage);
    }
  }

}
