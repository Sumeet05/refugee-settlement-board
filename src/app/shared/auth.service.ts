import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationResponse } from './authentication-response.model';
import { AppSettings } from '@shared/app-settings';
import { environment } from 'environments/environment';
import { Base64 } from 'js-base64';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  private userDetail: any;
  private authCredentials: string = Base64.encode(`refugee-board-client:secret`);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  get userdetail() {
    return this.userDetail;
  }

  checkAuthenticated() {
    let authUser = sessionStorage.getItem('auth-user');
    if (authUser && authUser !== null) {
      this.userDetail = JSON.parse(authUser);
    }
    let flag = this.userDetail !== undefined;
    this.isAuthenticated.next(flag);
    return flag;
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.authenticate(username, password).subscribe({
        next: (authenticationResponse: AuthenticationResponse) => {
          if (authenticationResponse && authenticationResponse.access_token !== null && authenticationResponse.refresh_token !== null) {
            this.userDetail = { username, access_token: authenticationResponse.access_token, refresh_token: authenticationResponse.refresh_token };
            this.isAuthenticated.next(true);
            sessionStorage.setItem('auth-user', JSON.stringify(this.userDetail));
            observer.next(true);
          } else {
            observer.error(false);
          }
        },
        error: (error: any) => {
          observer.error(error);
        }
      });
    });
  }

  private authenticate(username: string, password: string): Observable<AuthenticationResponse> {
    if (environment.production) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ${this.authCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
  
      const body = new HttpParams().set('grant_type', 'password').set('password', password);
      const url = `${environment.appUrl}${AppSettings.OAUTH_TOKEN_URL}${username}`;
  
      return this.httpClient.post<any>(url, body, httpOptions).pipe(
        map((response: any) => {
          console.log(response);
          return new AuthenticationResponse(response.access_token, response.refresh_token);
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(`Failed to login: ${error.message}`);
          return of(new AuthenticationResponse(null, null));
        })
      );
    } else {
      return new Observable((observer: Observer<AuthenticationResponse>) => {
        if (username==='admin' && password==='admin') {
          observer.next(new AuthenticationResponse('dev_access_token', 'dev_refresh_token'));
        } else {
          console.log(`Failed to login username and password not match`);
          observer.next(new AuthenticationResponse(null, null));
        }
      });
    }

  }

  logout(redirectTo?: string) {
    this.userDetail = undefined;
    sessionStorage.removeItem('auth-user');
    this.isAuthenticated.next(false);
    this.router.navigate([redirectTo !== undefined ? redirectTo : '/']);
  }

}
