import {Injectable} from '@angular/core';
import {AuthResponseDto} from '../models/auth-response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  private authData: AuthResponseDto = {};

  setAuthData(data: AuthResponseDto): void {
    this.authData = {...this.authData, ...data};
  }

  getAuthData(): AuthResponseDto {
    return this.authData;
  }

  clearAuthData(): void {
    this.authData = {};
  }
}
