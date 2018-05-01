import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get user info (it works only for authentication user)
   * @returns {Observable<any>}
   */
  getUser(): Observable<any> {
    return this.http.get<any>('http://192.168.0.106:8080/user');
  }
}
