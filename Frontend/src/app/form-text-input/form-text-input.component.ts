import {Component} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {phosphorUser} from '@ng-icons/phosphor-icons/regular';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'form-text-input',
  imports: [
    NgIcon
  ],
  viewProviders: [provideIcons({phosphorUser}), {
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }],
  templateUrl: './form-text-input.component.html',
  styleUrl: './form-text-input.component.css'
})
export class FormTextInputComponent {

}
