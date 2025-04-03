import {Component, OnInit} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormPasswordInputComponent} from '../../../../shared/form-password-input/form-password-input.component';
import {FormTextInputComponent} from '../../../../shared/form-text-input/form-text-input.component';
import {StatusMessageComponent} from '../../../../shared/status-message/status-message.component';
import {AutocompleteType} from '../../../../shared/types/autocomplete-type';

@Component({
  selector: 'login-form',
  imports: [
    FormButtonComponent,
    FormsModule,
    FormPasswordInputComponent,
    FormTextInputComponent,
    ReactiveFormsModule,
    StatusMessageComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
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
