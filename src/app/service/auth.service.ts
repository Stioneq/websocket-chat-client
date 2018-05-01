import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }


  signUp(username: string, password: string) {
    return this.http.post('http://192.168.0.106:8080/user/sign-up', {username: username, password: password});
  }

  login(username: string, password: string) {
    return this.http.post('http://192.168.0.106:8080/user/login', {username: username, password: password}, {responseType: 'text'});
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
