import {Component, OnInit} from '@angular/core';
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
  }],    templateUrl: './totp-card.component.html',
  styleUrl: './totp-card.component.css'
})
export class TotpCardComponent implements OnInit {
  mode!: AuthMode;
  qrData!: string;
  totpToken!: string;

  constructor(private readonly inMemoryDataService: InMemoryDataService) {
  }

  ngOnInit(): void {
    const state = history.state;
    if (state?.mode) {
      this.mode = state.mode;
    }

    const tokenData = this.inMemoryDataService.getTokenData();
    this.qrData = tokenData.secret ?? '';
    this.totpToken = tokenData.totpToken ?? '';
  }

  protected readonly AuthMode = AuthMode;
}
