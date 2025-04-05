import {Component, Input, OnInit} from '@angular/core';
import {AuthHeaderComponent} from "../../components/auth-header/auth-header.component";
import {AuthSubtitleComponent} from "../../components/auth-subtitle/auth-subtitle.component";
import {AuthMode} from '../../components/types/auth-mode';
import {QRCodeComponent} from 'angularx-qrcode';
import {TotpFormComponent} from '../../components/totp-form/totp-form.component';
import {RegisterResponseDto} from '../../models/register-response-dto.model';

@Component({
  selector: 'app-totp-card',
  imports: [
    AuthHeaderComponent,
    AuthSubtitleComponent,
    TotpFormComponent,
    QRCodeComponent
  ],
  templateUrl: './totp-card.component.html',
  styleUrl: './totp-card.component.css'
})
export class TotpCardComponent implements OnInit {
  @Input() mode!: AuthMode;
  @Input() registrationResponse!: RegisterResponseDto;

  qrData!: string;
  totpToken!: string;

  ngOnInit(): void {
    const state = history.state;
    if (state?.mode) {
      this.mode = state.mode;
    }

    if (!state?.registrationResponse) {
      console.error('No registration data!');
    }

    this.qrData = state.registrationResponse.secret;
    this.totpToken = state.registrationResponse.totpToken;
  }

  protected readonly AuthMode = AuthMode;
}
