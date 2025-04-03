import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'auth-cta',
  imports: [
    NgIf
  ],
  templateUrl: './auth-cta.component.html',
  styleUrl: './auth-cta.component.css'
})

export class AuthCtaComponent {
  @Input() mode: 'login' | 'register' = 'login';
}
