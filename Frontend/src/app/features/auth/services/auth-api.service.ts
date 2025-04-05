import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.development';

export interface RegisterRequest {
  login: string;
  password: string;
  name: string;
  surname: string;
  email: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface TotpRequest {
  totpToken: string;
  secret: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly baseUrl = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  logout(data: LoginRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, data);
  }

  verifyTotp(data: TotpRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/totp`, data);
  }
}
