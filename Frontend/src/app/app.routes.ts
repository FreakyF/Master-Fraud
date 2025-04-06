import {Routes} from '@angular/router';
import {LoginCardComponent} from './features/auth/components/login-card/login-card.component';
import {RegisterCardComponent} from './features/auth/components/register-card/register-card.component';
import {TotpCardComponent} from './features/auth/components/totp-card/totp-card.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {totpGuard} from './features/auth/guards/totp.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', title: 'Login'},
  {path: 'login', component: LoginCardComponent, title: 'Login'},
  {path: 'register', component: RegisterCardComponent, title: 'Register'},
  {path: 'totp', component: TotpCardComponent, canActivate: [totpGuard], title: 'Totp'},
  {path: '**', component: PageNotFoundComponent, title: '404'}
];
