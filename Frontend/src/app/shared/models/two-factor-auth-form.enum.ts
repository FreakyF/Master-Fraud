import {FormControl} from '@angular/forms';

export interface TwoFactorAuthForm {
  secret: FormControl<string>,
}
