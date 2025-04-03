import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {AuthMode} from '../types/auth-mode';

@Component({
  selector: 'auth-subtitle',
  imports: [
    NgIf
  ],
  templateUrl: './auth-subtitle.component.html',
  styleUrl: './auth-subtitle.component.css'
})
export class AuthSubtitleComponent {
  @Input({required: true}) mode!: AuthMode;
  protected readonly AuthMode = AuthMode;
}
