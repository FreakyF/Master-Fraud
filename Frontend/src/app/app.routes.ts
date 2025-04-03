import {Routes} from '@angular/router';
import {LoginCardComponent} from './features/auth/components/login-card/login-card.component';
import {RegisterCardComponent} from './features/auth/components/register-card/register-card.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginCardComponent },
  { path: 'register', component: RegisterCardComponent },
  { path: '**', redirectTo: 'login' }
];
