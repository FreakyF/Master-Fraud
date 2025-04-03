import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'auth-subtitle',
  imports: [
    NgIf
  ],
  templateUrl: './auth-subtitle.component.html',
  styleUrl: './auth-subtitle.component.css'
})
export class AuthSubtitleComponent {
  @Input() mode: 'login' | 'register' = 'login';
}
