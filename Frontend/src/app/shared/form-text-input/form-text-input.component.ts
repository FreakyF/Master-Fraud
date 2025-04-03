import {Component, Input} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  phosphorAt,
  phosphorEnvelopeSimple,
  phosphorIdentificationCard,
  phosphorUser
} from '@ng-icons/phosphor-icons/regular';
import {ControlContainer, FormGroupDirective} from '@angular/forms';
import {AutocompleteType} from '../types/autocomplete-type';

@Component({
  selector: 'form-text-input',
  imports: [
    NgIcon
  ],
  viewProviders: [provideIcons({phosphorUser, phosphorIdentificationCard, phosphorAt, phosphorEnvelopeSimple}), {
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }],
  templateUrl: './form-text-input.component.html',
  styleUrl: './form-text-input.component.css'
})

export class FormTextInputComponent {
  @Input({required: true}) icon!: string;
  @Input({required: true}) placeholder!: string;
  @Input({required: true}) id!: string;
  @Input({required: true}) ariaLabel!: string;
  @Input() autocomplete: AutocompleteType = AutocompleteType.OFF;
}
