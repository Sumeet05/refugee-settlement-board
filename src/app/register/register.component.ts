import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(5)]),
  });
  hide = true;

  get usernameInput() { return this.register.get('username'); }
  get firstnameInput() { return this.register.get('firstname'); }
  get lastnameInput() { return this.register.get('lastname'); }
  get dateOfBirthInput() { return this.register.get('dateOfBirth'); }
  get passwordInput() { return this.register.get('password'); }
  get emailInput() { return this.register.get('email'); }

  constructor() { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    
  }
}
