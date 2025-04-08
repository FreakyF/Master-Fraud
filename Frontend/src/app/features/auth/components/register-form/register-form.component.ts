import {Component, inject} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormPasswordInputComponent} from '../../../../shared/form-password-input/form-password-input.component';
import {FormTextInputComponent} from '../../../../shared/form-text-input/form-text-input.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StatusMessageComponent} from '../../../../shared/status-message/status-message.component';
import {RegisterForm} from '../../../../shared/models/register-form.model';
import {AutocompleteType} from '../../../../shared/types/autocomplete-type.enum';
import {RegisterFormControlType} from '../../../../shared/types/register-form-control.enum';
import {AuthApiService} from '../../services/auth-api.service';
import {firstValueFrom} from 'rxjs';
import {RegisterRequestDto} from '../../models/request/register-request-dto.model';
import {Router} from '@angular/router';
import {AuthMode} from '../types/auth-mode';
import {firstNameValidator} from '../../validators/first-name.validator';
import {RestrictFirstNameDirective} from '../../../../shared/directives/restrict/restrict-first-name.directive';
import {lastNameValidator} from '../../validators/last-name.validator';
import {usernameValidator} from '../../validators/username.validator';
import {passwordValidator} from '../../validators/password.validator';
import {emailValidator} from '../../validators/email.validator';
import {RestrictLastNameDirective} from '../../../../shared/directives/restrict/restrict-last-name.directive';
import {RestrictPasswordDirective} from '../../../../shared/directives/restrict/restrict-password.directive';
import {RestrictUsernameDirective} from '../../../../shared/directives/restrict/restrict-username.directive';
import {RestrictEmailDirective} from '../../../../shared/directives/restrict/restrict-email.directive';
import {FormErrorService} from '../../../../shared/services/form-error.service';
import {TrimWhitespacesDirective} from '../../../../shared/directives/normalize/trim-whitespaces.directive';
import {ConvertToLowercaseDirective} from '../../../../shared/directives/normalize/convert-to-lowercase.directive';

@Component({
  selector: 'register-form',
  imports: [
    FormButtonComponent,
    FormPasswordInputComponent,
    FormTextInputComponent,
    FormsModule,
    StatusMessageComponent,
    ReactiveFormsModule,
    RestrictFirstNameDirective,
    RestrictLastNameDirective,
    RestrictUsernameDirective,
    RestrictPasswordDirective,
    RestrictEmailDirective,
    TrimWhitespacesDirective,
    ConvertToLowercaseDirective,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  public status: string = '';
  protected readonly form: FormGroup<RegisterForm>;
  protected readonly AutocompleteType = AutocompleteType;
  protected readonly RegisterFormControlType = RegisterFormControlType;

  private readonly authApiService = inject(AuthApiService);
  private readonly formErrorService = inject(FormErrorService);
  private readonly router = inject(Router);

  constructor() {
    this.form = new FormGroup<RegisterForm>({
      [RegisterFormControlType.FIRST_NAME]: new FormControl('', {
        nonNullable: true,
        validators: firstNameValidator
      }),
      [RegisterFormControlType.LAST_NAME]: new FormControl('', {
        nonNullable: true,
        validators: lastNameValidator
      }),
      [RegisterFormControlType.USERNAME]: new FormControl('', {
        nonNullable: true,
        validators: usernameValidator
      }),
      [RegisterFormControlType.EMAIL]: new FormControl('', {
        nonNullable: true,
        validators: emailValidator
      }),
      [RegisterFormControlType.PASSWORD]: new FormControl('', {
        nonNullable: true,
        validators: passwordValidator
      }),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.status = this.formErrorService.getFirstError(this.form);
      return;
    }
    const registerData = this.bindRegisterData();

    try {
      await firstValueFrom(this.authApiService.register(registerData));
      await this.router.navigate(['/totp'], {state: {mode: AuthMode.TWO_FACTOR_AUTH_REGISTER}});
    } catch (error) {
      this.status = "Something went wrong, please try again"
    }
  }

  private bindRegisterData() {
    const {firstName = '', lastName = '', username = '', email = '', password = ''} = this.form.value;
    const registerData: RegisterRequestDto = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: password,
    };
    return registerData;
  }
}
