import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(`${environment.appUrl}/rest`)) {
      const headers = req.headers.set('Authorization', `Bearer ${this.authService.userdetail.access_token}`);
      const authRequest = req.clone({ headers });
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
