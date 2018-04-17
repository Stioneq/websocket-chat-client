import {Injectable} from '@angular/core';
import {UserInfo} from '../model/user-info';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserInfoService {

  private userInfo: Observable<UserInfo>;

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo(): Observable<UserInfo> {
    this.userInfo = <Observable<UserInfo>>this.httpClient.get('http://localhost:8080/api/userInfo');
    return this.userInfo;
  }


}
