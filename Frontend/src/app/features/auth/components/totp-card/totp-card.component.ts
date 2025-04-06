import {Component, inject, OnInit} from '@angular/core';
import {AuthHeaderComponent} from "../auth-header/auth-header.component";
import {AuthSubtitleComponent} from "../auth-subtitle/auth-subtitle.component";
import {AuthMode} from '../types/auth-mode';
import {QRCodeComponent} from 'angularx-qrcode';
import {TotpFormComponent} from '../totp-form/totp-form.component';
import {InMemoryDataService} from '../../services/in-memory-data.service';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {ControlContainer, FormGroupDirective} from '@angular/forms';
import {phosphorLockOpenLight} from '@ng-icons/phosphor-icons/light';

@Component({
  selector: 'app-totp-card',
  imports: [
    AuthHeaderComponent,
    AuthSubtitleComponent,
    TotpFormComponent,
    QRCodeComponent,
    NgIcon
  ],
  viewProviders: [provideIcons({phosphorLockOpenLight}), {
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }], templateUrl: './totp-card.component.html',
  styleUrl: './totp-card.component.css'
})
export class TotpCardComponent implements OnInit {
  mode!: AuthMode;
  qrData!: string;
  totpToken!: string;
  protected readonly AuthMode = AuthMode;

  private readonly inMemoryDataService = inject(InMemoryDataService);

  ngOnInit(): void {
    const state = history.state;
    if (state?.mode) {
      this.mode = state.mode;
    }

    const authData = this.inMemoryDataService.getAuthData();
    this.qrData = authData.secret ?? '';
    this.totpToken = authData.totpToken ?? '';
  }
}
