import {Component, Input} from '@angular/core';
import {AuthMode} from '../types/auth-mode';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'auth-cta',
  imports: [
    RouterLink
  ],
  templateUrl: './auth-cta.component.html',
  styleUrl: './auth-cta.component.css'
})

export class AuthCtaComponent {
  @Input({required: true}) mode!: AuthMode;
  protected readonly AuthMode = AuthMode;
}
