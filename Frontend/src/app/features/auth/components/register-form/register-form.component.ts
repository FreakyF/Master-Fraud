import {Component, OnInit} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormPasswordInputComponent} from '../../../../shared/form-password-input/form-password-input.component';
import {FormTextInputComponent} from '../../../../shared/form-text-input/form-text-input.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StatusMessageComponent} from '../../../../shared/status-message/status-message.component';
import { AutocompleteType } from '../../../../shared/types/autocomplete-type';

@Component({
  selector: 'register-form',
  imports: [
    FormButtonComponent,
    FormPasswordInputComponent,
    FormTextInputComponent,
    FormsModule,
    StatusMessageComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  async onSubmit() {
    console.log("Test");
    return Promise<void>;
  }

  protected readonly AutocompleteType = AutocompleteType;
}
