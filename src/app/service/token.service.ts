import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class TokenService {

  constructor(private localStorageService: LocalStorageService) {
  }


  setToken(token: string) {
    this.localStorageService.setValue('token', token);
  }

  getToken() {
    return this.localStorageService.getValue('token');
  }

  getToken$() {
    return this.localStorageService.getSubscription('token');
  }
}
