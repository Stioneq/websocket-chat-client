import {Injectable} from '@angular/core';
import {UserInfo} from '../model/user-info';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserInfoService {

  private userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo(): Observable<string> {
    return this.httpClient.get('/api/userInfo', {responseType: 'text'});
  }


  setUserInfo(userInfo: UserInfo) {
    this.userInfo.next(userInfo);
  }
}
