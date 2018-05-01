import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {LocalStorageService} from '../../service/local-storage.service';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  private err = '';
  private username = '';
  private password = '';

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {

    this.authService.login(this.username, this.password).subscribe((token) => {
      this.tokenService.setToken(token);
      this.router.navigate(['']);
    }, (err) => {
      this.err = 'Invalid credentials';

    });
  }

}
