import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginCardComponent} from './features/auth/components/login-card/login-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, LoginCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
