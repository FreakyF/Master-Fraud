import {inject, Injectable, OnDestroy} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {InMemoryDataService} from './in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class OnUnloadService implements OnDestroy {
  private readonly logoutUrl = `${environment.apiUrl}auth/logout`;

  private readonly inMemoryDataService = inject(InMemoryDataService);

  constructor() {
    window.addEventListener('beforeunload', this.unloadHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.unloadHandler);
  }

  private readonly unloadHandler = (): void => {
    const authData = this.inMemoryDataService.getAuthData();
    const logoutRequestDto = {token: authData.token};
    const logoutData = JSON.stringify(logoutRequestDto);
    navigator.sendBeacon(this.logoutUrl, logoutData);
  };
}
