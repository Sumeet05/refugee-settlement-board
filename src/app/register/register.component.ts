import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // User: any = ['Admin', 'user'];

  register: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(5)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  hide = true;
  get usernameInput() { return this.register.get('username'); }
  get passwordInput() { return this.register.get('password'); }
  get emailInput() { return this.register.get('email'); }

  constructor() { }

  ngOnInit(): void {
    
  }

}
