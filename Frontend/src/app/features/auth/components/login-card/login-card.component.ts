import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthCtaComponent} from "../auth-cta/auth-cta.component";
import {AuthHeaderComponent} from "../auth-header/auth-header.component";
import {AuthSubtitleComponent} from "../auth-subtitle/auth-subtitle.component";
import {LoginFormComponent} from '../login-form/login-form.component';
import {AuthMode} from '../types/auth-mode';

@Component({
    selector: 'login-card',
  imports: [
    ReactiveFormsModule,
    AuthCtaComponent,
    AuthCtaComponent,
    AuthHeaderComponent,
    AuthSubtitleComponent,
    LoginFormComponent,
  ],
    templateUrl: './login-card.component.html',
    styleUrl: './login-card.component.css'
})
export class LoginCardComponent {
  protected readonly AuthMode = AuthMode;
}
