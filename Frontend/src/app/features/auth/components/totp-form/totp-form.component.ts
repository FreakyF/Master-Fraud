import {Component, Input} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormTextInputComponent} from '../../../../shared/form-text-input/form-text-input.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {StatusMessageComponent} from '../../../../shared/status-message/status-message.component';
import {AutocompleteType} from '../../../../shared/types/autocomplete-type.enum';
import {TwoFactorAuthForm} from '../../../../shared/models/two-factor-auth-form.enum';
import {AuthApiService} from '../../services/auth-api.service';
import {TwoFactorAuthFormControlType} from '../../../../shared/types/two-factor-auth-form-control.enum';
import {firstValueFrom} from 'rxjs';
import {TotpRequestDto} from '../../models/totp-request-dto.model';

@Component({
  selector: 'totp-form',
  imports: [
    FormButtonComponent,
    FormTextInputComponent,
    ReactiveFormsModule,
    StatusMessageComponent
  ],
  templateUrl: './totp-form.component.html',
  styleUrl: './totp-form.component.css'
})
export class TotpFormComponent {
  @Input() totpToken!: string;
  protected readonly form: FormGroup<TwoFactorAuthForm>;

  constructor(private readonly authApiService: AuthApiService) {
    this.form = new FormGroup<TwoFactorAuthForm>({
      [TwoFactorAuthFormControlType.SECRET]: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    const totpData = this.bindTotpData();

    try {
      const response = await firstValueFrom(this.authApiService.verifyTotp(totpData));
      console.log('Totp successful', response);
    } catch (error) {
      console.error('Totp failed', error);
    }
  }

  private bindTotpData() {
    const {secret = ''} = this.form.value;
    const totpData: TotpRequestDto = {
      totpToken: this.totpToken,
      secret: secret,
    };
    return totpData;
  }

  protected readonly AutocompleteType = AutocompleteType;
  protected readonly TwoFactorAuthFormControlType = TwoFactorAuthFormControlType;
}
