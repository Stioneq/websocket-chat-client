import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {TokenService} from '../service/token.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  const;
  excludedUrl = [
    '/login',
    '/user/sign-up'
  ];

  constructor(private tokenService: TokenService, private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.excludedUrl.some(x => req.url.endsWith(x))) {
      return next.handle(req);
    }
    req = req.clone({setHeaders: {Authorization: this.tokenService.getToken()}});
    return next.handle(req).pipe(catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        this.router.navigate(['/login']);
      }
      return of(err);
    }));
  }
}
