import {Injectable} from '@angular/core';

export interface AuthTokenResponse {
  totpToken?: string;
  secret?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  private tokenData: AuthTokenResponse = {};

  setTokenData(data: AuthTokenResponse): void {
    this.tokenData = {...this.tokenData, ...data};
  }

  getTokenData(): AuthTokenResponse {
    return this.tokenData;
  }

  clearTokenData(): void {
    this.tokenData = {};
  }
}
