import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.development';
import {RegisterRequestDto} from '../models/register-request-dto.model';
import {LoginRequestDto} from '../models/login-request-dto.model';
import {TotpRequestDto} from '../models/totp-request-dto.model';
import {LoginResponseDto} from '../models/login-response-dto.model';
import {RegisterResponseDto} from '../models/register-response-dto.model';
import {TotpResponseDto} from '../models/totp-response-dto.model';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly baseUrl = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.baseUrl}/register`, data);
  }

  login(data: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, data);
  }

  verifyTotp(data: TotpRequestDto): Observable<TotpResponseDto> {
    return this.http.post<TotpResponseDto>(`${this.baseUrl}/totp`, data);
  }

  logout(data: LoginRequestDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, data);
  }
}
