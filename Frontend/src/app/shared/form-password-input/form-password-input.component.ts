import {Component, Input} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {phosphorEye, phosphorEyeSlash, phosphorLock} from '@ng-icons/phosphor-icons/regular';
import {ControlContainer, FormGroupDirective} from '@angular/forms';
import {AutocompleteType} from '../types/autocomplete-type';

export type PasswordAutocompleteType =
  AutocompleteType.CURRENT_PASSWORD
  | AutocompleteType.NEW_PASSWORD
  | AutocompleteType.OFF;

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
  @Input() autocomplete: PasswordAutocompleteType = AutocompleteType.OFF;

  public isPasswordVisible: boolean = false;

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  protected readonly AutocompleteType = AutocompleteType;
}
