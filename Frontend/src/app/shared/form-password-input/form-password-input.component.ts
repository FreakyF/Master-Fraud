import {Component, forwardRef, Input} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {phosphorEye, phosphorEyeSlash, phosphorLock} from '@ng-icons/phosphor-icons/regular';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {AutocompleteType} from '../types/autocomplete-type.enum';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPasswordInputComponent),
      multi: true,
    },
  ],
  templateUrl: './form-password-input.component.html',
  styleUrl: './form-password-input.component.css'
})
export class FormPasswordInputComponent implements ControlValueAccessor {
  @Input({required: true}) public formControl!: FormControl<string | null>;
  @Input() autocomplete: PasswordAutocompleteType = AutocompleteType.OFF;
  public isPasswordVisible: boolean = false;
  protected value: string = '';
  protected isDisabled: boolean = false;
  protected onChange!: (value: string) => void;
  protected onTouched!: () => void;

  protected get IsInvalid(): boolean {
    const isInvalid: boolean = this.formControl.invalid;
    if (!isInvalid) {
      return false;
    }

    const isDirty: boolean = this.formControl.dirty;
    const isTouched: boolean = this.formControl.touched;
    return isDirty || isTouched;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  protected onInput(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = input.value;

    this.value = value;
    this.onChange(value);
  }
}
