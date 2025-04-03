import { Component } from '@angular/core';
import {AuthCtaComponent} from '../auth-cta/auth-cta.component';
import {AuthHeaderComponent} from '../auth-header/auth-header.component';
import {AuthSubtitleComponent} from '../auth-subtitle/auth-subtitle.component';
import {RegisterFormComponent} from '../register-form/register-form.component';
import {AuthMode} from '../types/auth-mode';

@Component({
  selector: 'register-card',
  imports: [
    AuthCtaComponent,
    AuthHeaderComponent,
    AuthSubtitleComponent,
    RegisterFormComponent
  ],
  templateUrl: './register-card.component.html',
  styleUrl: './register-card.component.css'
})
export class RegisterCardComponent {

  protected readonly AuthMode = AuthMode;
}
