import {Routes} from '@angular/router';
import {ChatComponent} from './component/chat/chat.component';
import {LoginComponent} from './component/login/login.component';
import {LoginGuard} from './guard/login.guard';
import {AuthGuard} from './guard/auth.guard';

export const ROUTES: Routes = [
  {path: '', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo: ''}
];

