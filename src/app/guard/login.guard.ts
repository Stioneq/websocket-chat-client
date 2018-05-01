import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../service/auth.service';

/**
 * Used to prevent of login form being loaded when user is authenticated
 */
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return !this.authService.isAuthenticated();
  }
}
