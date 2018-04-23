import {Injectable} from '@angular/core';
import {UserInfo} from '../model/user-info';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserInfoService {

  private userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo(): BehaviorSubject<UserInfo> {
    return this.userInfo;
  }


  setUserInfo(userInfo: UserInfo) {
    this.userInfo.next(userInfo);
  }
}
