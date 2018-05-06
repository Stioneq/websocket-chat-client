import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }


  signUp(username: string, password: string) {
    return this.http.post(environment.url + '/user/sign-up', {username: username, password: password});
  }

  login(username: string, password: string) {
    return this.http.post(environment.url + '/user/login', {username: username, password: password}, {responseType: 'text'});
  }

  logout() {
    this.tokenService.setToken('');
  }

  isAuthenticated() {
    return !!this.tokenService.getToken();
  }

  isAuthenticated$() {
    return this.tokenService.getToken$();
  }
}
