import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {InMemoryDataService} from './in-memory-data.service';
import {Observable} from 'rxjs';
import {AuthResponseDto} from '../models/response/auth-response-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private readonly inMemoryDataService = inject(InMemoryDataService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authData = this.inMemoryDataService.getAuthData();
    let clonedRequest = req;

    clonedRequest = this.setTokenHeader(authData, clonedRequest);
    clonedRequest = this.setSecretHeader(authData, clonedRequest);
    clonedRequest = this.setTotpTokenHeader(authData, clonedRequest);

    return next.handle(clonedRequest);
  }

  private setTotpTokenHeader(authData: AuthResponseDto, clonedRequest: HttpRequest<unknown>) {
    if (authData.totpToken) {
      clonedRequest = clonedRequest.clone({
        headers: clonedRequest.headers.set('X-Totp-Token', authData.totpToken)
      });
    }
    return clonedRequest;
  }

  private setSecretHeader(authData: AuthResponseDto, clonedRequest: HttpRequest<unknown>) {
    if (authData.secret) {
      clonedRequest = clonedRequest.clone({
        headers: clonedRequest.headers.set('X-Secret', authData.secret)
      });
    }
    return clonedRequest;
  }

  private setTokenHeader(authData: AuthResponseDto, clonedRequest: HttpRequest<unknown>) {
    if (authData.token) {
      clonedRequest = clonedRequest.clone({
        headers: clonedRequest.headers.set('Authorization', `Bearer ${authData.token}`)
      });
    }
    return clonedRequest;
  }
}
