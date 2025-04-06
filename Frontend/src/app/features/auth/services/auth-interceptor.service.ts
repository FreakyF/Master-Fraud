import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthTokenResponse, InMemoryDataService} from './in-memory-data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private readonly tokenService: InMemoryDataService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenData = this.tokenService.getTokenData();
    let clonedRequest = req;

    clonedRequest = this.setTokenHeader(tokenData, clonedRequest);
    clonedRequest = this.setSecretHeader(tokenData, clonedRequest);
    clonedRequest = this.setTotpTokenHeader(tokenData, clonedRequest);

    return next.handle(clonedRequest);
  }

  private setTotpTokenHeader(tokenData: AuthTokenResponse, clonedRequest: HttpRequest<any>) {
    if (tokenData.totpToken) {
      clonedRequest = clonedRequest.clone({
        headers: clonedRequest.headers.set('X-Totp-Token', tokenData.totpToken)
      });
    }
    return clonedRequest;
  }

  private setSecretHeader(tokenData: AuthTokenResponse, clonedRequest: HttpRequest<any>) {
    if (tokenData.secret) {
      clonedRequest = clonedRequest.clone({
        headers: clonedRequest.headers.set('X-Secret', tokenData.secret)
      });
    }
    return clonedRequest;
  }

  private setTokenHeader(tokenData: AuthTokenResponse, clonedRequest: HttpRequest<any>) {
    if (tokenData.token) {
      clonedRequest = clonedRequest.clone({
        headers: clonedRequest.headers.set('Authorization', `Bearer ${tokenData.token}`)
      });
    }
    return clonedRequest;
  }
}
