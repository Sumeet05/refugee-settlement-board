import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  private userDetail: any;
  constructor(private router: Router) {

  }

  checkAuthenticated() {
    this.isAuthenticated.next(this.userDetail !== undefined);
    return this.userDetail !== undefined;
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      console.log(`username : ${username } password: ${password}`)
      if (username === 'admin' && password === 'admin') {
        this.userDetail = { username };
        this.isAuthenticated.next(true);
        console.log(`username : ${username } password: ${password} : Pass`)

        observer.next(true);
      } else {
      console.log(`username : ${username } password: ${password}: fail`)

        observer.error(false);
      }
    });
  }

  logout(redirectTo?: string) {
    this.userDetail = undefined;
    this.isAuthenticated.next(false);
    this.router.navigate([redirectTo !== undefined ? redirectTo: '/' ]);
  }

}
