import {AuthApiService} from '../../auth/services/auth-api.service';
import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {InMemoryDataService} from '../../auth/services/in-memory-data.service';


export const dashboardGuard: CanActivateFn = () => {
  const inMemoryDataService = inject(InMemoryDataService);
  const authApiService = inject(AuthApiService);
  const router = inject(Router);
  const authData = inMemoryDataService.getAuthData();

  if (authData?.token) {
    return true;
  }

  if (authData?.token) {
    const logoutRequestDto = {token: authData.token};
    authApiService.logout(logoutRequestDto).subscribe();
  }

  void router.navigate(['/login']);
  return false;
};
