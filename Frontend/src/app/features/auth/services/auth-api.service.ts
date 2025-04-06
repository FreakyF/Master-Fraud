import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../../environments/environment.development';
import {RegisterRequestDto} from '../models/register-request-dto.model';
import {LoginRequestDto} from '../models/login-request-dto.model';
import {TotpRequestDto} from '../models/totp-request-dto.model';
import {LoginResponseDto} from '../models/login-response-dto.model';
import {RegisterResponseDto} from '../models/register-response-dto.model';
import {TotpResponseDto} from '../models/totp-response-dto.model';
import {InMemoryDataService} from './in-memory-data.service';
import {LogoutRequestDto} from '../models/logout-request-dto.model';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly baseUrl = `${environment.apiUrl}auth`;

  private readonly http = inject(HttpClient);
  private readonly inMemoryDataService = inject(InMemoryDataService);

  register(data: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.baseUrl}/register`, data)
      .pipe(
        tap(response => {
          this.inMemoryDataService.setAuthData(response);
        })
      );
  }

  login(data: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, data)
      .pipe(
        tap(response => {
          this.inMemoryDataService.setAuthData(response);
        })
      );
  }

  verifyTotp(data: TotpRequestDto): Observable<TotpResponseDto> {
    return this.http.post<TotpResponseDto>(`${this.baseUrl}/totp`, data)
      .pipe(
        tap(response => {
          if (response.token) {
            this.inMemoryDataService.setAuthData(response);
          }
        })
      );
  }

  logout(data: LogoutRequestDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, data)
      .pipe(
        tap(() => {
          this.inMemoryDataService.clearAuthData();
        })
      );
  }
}
