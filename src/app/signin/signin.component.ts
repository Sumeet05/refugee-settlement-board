import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(5)])
  });
  hide = true;
  returnUrl: any;
  loginInvalid: boolean;
  get usernameInput() { return this.signin.get('username'); }
  get passwordInput() { return this.signin.get('password'); }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
    if (this.authService.checkAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit() {
    this.loginInvalid = false;
    if (this.signin.valid) {
      const username = this.usernameInput.value;
      const password = this.passwordInput.value;
      this.authService.login(username, password).subscribe((res: any) => {
        console.log(`login authenticated and navigate`)
        this.loginInvalid = false;
        this.router.navigate([this.returnUrl]);
      }, (error: any) => {
        console.log(`login failed: ${error}`)
        this.loginInvalid = true;
      })
    }
  }
}
