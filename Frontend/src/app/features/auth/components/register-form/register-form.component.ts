import {Component} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormPasswordInputComponent} from '../../../../shared/form-password-input/form-password-input.component';
import {FormTextInputComponent} from '../../../../shared/form-text-input/form-text-input.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {StatusMessageComponent} from '../../../../shared/status-message/status-message.component';
import {RegisterForm} from '../../../../shared/models/register-form.model';
import {AutocompleteType} from '../../../../shared/types/autocomplete-type.enum';
import {RegisterFormControlType} from '../../../../shared/types/register-form-control.enum';
import {AuthApiService} from '../../services/auth-api.service';
import {firstValueFrom} from 'rxjs';
import {RegisterRequestDto} from '../../models/register-request-dto.model';
import {Router} from '@angular/router';
import {AuthMode} from '../types/auth-mode';

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
export class RegisterFormComponent {
  protected readonly form: FormGroup<RegisterForm>;

  constructor(private readonly authApiService: AuthApiService, private readonly router: Router) {
    this.form = new FormGroup<RegisterForm>({
      [RegisterFormControlType.FIRST_NAME]: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
      [RegisterFormControlType.LAST_NAME]: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
      [RegisterFormControlType.USERNAME]: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
      [RegisterFormControlType.EMAIL]: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
      [RegisterFormControlType.PASSWORD]: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    const registerData = this.bindRegisterData();

    try {
      const response = await firstValueFrom(this.authApiService.register(registerData));
      console.log('Register successful', response);
      await this.router.navigate(['/totp'], {state: {mode: AuthMode.TWO_FACTOR_AUTH_REGISTER}});
    } catch (error) {
      console.error('Register failed', error);
    }
  }

  private bindRegisterData() {
    const {firstName = '', lastName = '', username = '', email = '', password = ''} = this.form.value;
    const registerData: RegisterRequestDto = {
      login: username,
      password: password,
      name: firstName,
      surname: lastName,
      email: email,
    };
    return registerData;
  }

  protected readonly AutocompleteType = AutocompleteType;
  protected readonly RegisterFormControlType = RegisterFormControlType;
}
