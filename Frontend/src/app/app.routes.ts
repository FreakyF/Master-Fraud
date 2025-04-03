import {Routes} from '@angular/router';
import {LoginCardComponent} from './features/auth/components/login-card/login-card.component';
import {RegisterCardComponent} from './features/auth/components/register-card/register-card.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', title: 'Login'},
  {path: 'login', component: LoginCardComponent, title: 'Login'},
  {path: 'register', component: RegisterCardComponent, title: 'Register'},
  {path: '**', redirectTo: 'login', title: 'Login'}
];
