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
    let authUser = localStorage.getItem('auth-user');
    if (authUser && authUser !== null) {
      this.userDetail = JSON.parse(authUser);
    }
    let flag = this.userDetail !== undefined;
    console.log(`this.userDetai ${this.userDetail}  - flag ${flag}`)
    this.isAuthenticated.next(flag);
    return flag;
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      console.log(`username : ${username } password: ${password}`)
      if (username === 'admin' && password === 'hzx9uLuNmQ') {
        this.userDetail = { username };
        this.isAuthenticated.next(true);
        console.log(`username : ${username } password: ${password} : Pass`)
        localStorage.setItem('auth-user', JSON.stringify(this.userDetail));
        observer.next(true);
      } else {
      console.log(`username : ${username } password: ${password}: fail`)

        observer.error(false);
      }
    });
  }

  logout(redirectTo?: string) {
    this.userDetail = undefined;
    localStorage.removeItem('auth-user');
    this.isAuthenticated.next(false);
    this.router.navigate([redirectTo !== undefined ? redirectTo: '/' ]);
  }

}
