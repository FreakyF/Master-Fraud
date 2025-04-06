import {Component} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormPasswordInputComponent} from '../../../../shared/form-password-input/form-password-input.component';
import {FormTextInputComponent} from '../../../../shared/form-text-input/form-text-input.component';
import {StatusMessageComponent} from '../../../../shared/status-message/status-message.component';
import {LoginForm} from '../../../../shared/models/login-form.model';
import {AutocompleteType} from '../../../../shared/types/autocomplete-type.enum';
import {LoginFormControlType} from '../../../../shared/types/login-form-control.enum';
import {AuthApiService} from '../../services/auth-api.service';
import {firstValueFrom} from 'rxjs';
import {LoginRequestDto} from '../../models/login-request-dto.model';
import {Router} from '@angular/router';
import {AuthMode} from '../types/auth-mode';

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
export class LoginFormComponent {
  protected readonly form: FormGroup<LoginForm>;

  constructor(private readonly authApiService: AuthApiService, private readonly router: Router) {
    this.form = new FormGroup<LoginForm>({
      [LoginFormControlType.USERNAME]: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
      [LoginFormControlType.PASSWORD]: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    const loginData = this.bindLoginData();

    try {
      const response = await firstValueFrom(this.authApiService.login(loginData));
      await this.router.navigate(['/totp'], {state: {mode: AuthMode.TWO_FACTOR_AUTH_LOGIN}});
      console.log('Login successful', response);
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  private bindLoginData() {
    const {username = '', password = ''} = this.form.value;

    const loginData: LoginRequestDto = {
      login: username,
      password: password
    };
    return loginData;
  }

  protected readonly AutocompleteType = AutocompleteType;
  protected readonly LoginFormControlType = LoginFormControlType;
}
