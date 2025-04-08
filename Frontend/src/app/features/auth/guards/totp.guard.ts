import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {InMemoryDataService} from '../services/in-memory-data.service';
import {AuthApiService} from '../services/auth-api.service';

export const totpGuard: CanActivateFn = () => {
  const inMemoryDataService = inject(InMemoryDataService);
  const authApiService = inject(AuthApiService);
  const router = inject(Router);
  const authData = inMemoryDataService.getAuthData();

  if (authData?.totpToken) {
    return true;
  }

  if (authData?.token) {
    const logoutRequestDto = {token: authData.token};
    authApiService.logout(logoutRequestDto).subscribe();
  }

  void router.navigate(['/login']);
  return false;
};
