import {Component} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormPasswordInputComponent} from '../../../../shared/form-password-input/form-password-input.component';
import {FormTextInputComponent} from '../../../../shared/form-text-input/form-text-input.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {StatusMessageComponent} from '../../../../shared/status-message/status-message.component';
import {RegisterForm} from '../../../../shared/models/register-form.model';
import {AutocompleteType} from '../../../../shared/types/autocomplete-type.enum';
import {RegisterFormControlType} from '../../../../shared/types/register-form-control.enum';
import {AuthApiService, RegisterRequest} from '../../services/auth-api.service';
import {PasswordHashingService} from '../../services/password-hashing.service';
import {firstValueFrom} from 'rxjs';

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

  constructor(private readonly authApiService: AuthApiService,
              private readonly passwordHashingService: PasswordHashingService) {
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

    const {firstName = '', lastName = '', username = '', email = '', password = ''} = this.form.value;

    try {
      const salt = await this.passwordHashingService.generateSalt();
      // const hashedPassword = await this.passwordHashingService.hashPassword(password, salt);

      const registerData: RegisterRequest = {
        login: username,
        password: password,
        name: firstName,
        surname: lastName,
        email: email,
      };

      const response = await firstValueFrom(this.authApiService.register(registerData));
      console.log('Register successful', response);
    } catch (error) {
      console.error('Register failed', error);
    }
  }

  protected readonly AutocompleteType = AutocompleteType;
  protected readonly RegisterFormControlType = RegisterFormControlType;
}
