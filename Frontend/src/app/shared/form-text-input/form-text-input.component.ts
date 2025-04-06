import {Component, forwardRef, Input} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  phosphorAt,
  phosphorClockCountdown,
  phosphorEnvelopeSimple,
  phosphorIdentificationCard,
  phosphorUser
} from '@ng-icons/phosphor-icons/regular';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {AutocompleteType} from '../types/autocomplete-type.enum';

@Component({
  selector: 'form-text-input',
  imports: [
    NgIcon
  ],
  viewProviders: [provideIcons({
    phosphorUser,
    phosphorIdentificationCard,
    phosphorAt,
    phosphorEnvelopeSimple,
    phosphorClockCountdown
  }), {
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextInputComponent),
      multi: true,
    },
  ],
  templateUrl: './form-text-input.component.html',
  styleUrl: './form-text-input.component.css'
})

export class FormTextInputComponent implements ControlValueAccessor {
  @Input({required: true}) public formControl!: FormControl<string | null>;
  @Input({required: true}) icon!: string;
  @Input({required: true}) placeholder!: string;
  @Input({required: true}) id!: string;
  @Input({required: true}) ariaLabel!: string;
  @Input() autocomplete: AutocompleteType = AutocompleteType.OFF;

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

  protected onInput(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = input.value;

    this.value = value;
    this.onChange(value);
  }
}
