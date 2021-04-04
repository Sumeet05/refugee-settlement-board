import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  saveNewUser() : Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {

      

      observer.next(false);
      observer.complete();
    });
  }
}
