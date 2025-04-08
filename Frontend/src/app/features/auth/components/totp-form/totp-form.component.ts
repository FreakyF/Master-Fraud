import {Component, inject, Input, OnDestroy} from '@angular/core';
import {FormButtonComponent} from '../../../../shared/form-button/form-button.component';
import {FormTextInputComponent} from '../../../../shared/form-text-input/form-text-input.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {StatusMessageComponent} from '../../../../shared/status-message/status-message.component';
import {AutocompleteType} from '../../../../shared/types/autocomplete-type.enum';
import {TwoFactorAuthForm} from '../../../../shared/models/two-factor-auth-form.enum';
import {AuthApiService} from '../../services/auth-api.service';
import {TwoFactorAuthFormControlType} from '../../../../shared/types/two-factor-auth-form-control.enum';
import {firstValueFrom} from 'rxjs';
import {TotpRequestDto} from '../../models/request/totp-request-dto.model';
import {InMemoryDataService} from '../../services/in-memory-data.service';
import {totpValidator} from '../../validators/totp.validator';
import {RestrictTotpDirective} from '../../../../shared/directives/restrict/restrict-totp.directive';
import {FormErrorService} from '../../../../shared/services/form-error.service';
import {TrimWhitespacesDirective} from '../../../../shared/directives/normalize/trim-whitespaces.directive';

@Component({
  selector: 'totp-form',
  imports: [
    FormButtonComponent,
    FormTextInputComponent,
    ReactiveFormsModule,
    StatusMessageComponent,
    RestrictTotpDirective,
    TrimWhitespacesDirective
  ],
  templateUrl: './totp-form.component.html',
  styleUrl: './totp-form.component.css'
})
export class TotpFormComponent implements OnDestroy {
  @Input() totpToken!: string;
  public status: string = '';
  protected readonly form: FormGroup<TwoFactorAuthForm>;
  protected readonly AutocompleteType = AutocompleteType;
  protected readonly TwoFactorAuthFormControlType = TwoFactorAuthFormControlType;

  private readonly authApiService = inject(AuthApiService);
  private readonly formErrorService = inject(FormErrorService);
  private readonly inMemoryDataService = inject(InMemoryDataService);

  constructor() {
    this.form = new FormGroup<TwoFactorAuthForm>({
      [TwoFactorAuthFormControlType.SECRET]: new FormControl('', {
        nonNullable: true,
        validators: totpValidator
      }),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.status = this.formErrorService.getFirstError(this.form);
      return;
    }
    const totpData = this.bindTotpData();

    try {
      await firstValueFrom(this.authApiService.verifyTotp(totpData));
    } catch (error) {
      this.status = "Something went wrong, please try again"
    }
  }

  ngOnDestroy(): void {
    this.inMemoryDataService.clearAuthData();
  }

  private bindTotpData() {
    const {secret = ''} = this.form.value;
    const totpData: TotpRequestDto = {
      totpToken: this.totpToken,
      secret: secret.trim(),
    };
    return totpData;
  }
}
