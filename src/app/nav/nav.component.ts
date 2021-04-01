import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  title = 'Refugee Settlement Board'
  authenticatedMenuItems = [{title:'dashboard', icon: 'dashboard'}, {title:'admin', icon:'account_box'} ];
  unAuthenticatedMenuItems = [{title: 'help', icon: 'help'}]
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isAuthenticated: boolean;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.checkAuthenticated();
  }

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) {
    this.authService.isAuthenticated.subscribe((isAuthenticated: boolean) =>
      this.isAuthenticated = isAuthenticated);
  }

  logout() {
    this.authService.logout();
  }

}
