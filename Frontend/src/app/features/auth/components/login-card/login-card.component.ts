import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginFormComponent} from "../login-form/login-form.component";
import {AuthCtaComponent} from "../auth-cta/auth-cta.component";
import {AuthHeaderComponent} from "../auth-header/auth-header.component";
import {AuthSubtitleComponent} from "../auth-subtitle/auth-subtitle.component";

@Component({
    selector: 'login-card',
    imports: [
        ReactiveFormsModule,
        AuthCtaComponent,
        LoginFormComponent,
        LoginFormComponent,
        AuthCtaComponent,
        AuthHeaderComponent,
        AuthSubtitleComponent,
    ],
    templateUrl: './login-card.component.html',
    styleUrl: './login-card.component.css'
})
export class LoginCardComponent {
}
