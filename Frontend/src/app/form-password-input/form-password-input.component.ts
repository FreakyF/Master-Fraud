import {Component} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {phosphorEye, phosphorEyeSlash, phosphorLock} from '@ng-icons/phosphor-icons/regular';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'form-password-input',
  imports: [
    NgIcon
  ],
  viewProviders: [provideIcons({phosphorLock, phosphorEye, phosphorEyeSlash}), {
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }],
  templateUrl: './form-password-input.component.html',
  styleUrl: './form-password-input.component.css'
})
export class FormPasswordInputComponent {
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
