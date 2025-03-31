import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginPanelComponent} from './login-panel/login-panel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, LoginPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
