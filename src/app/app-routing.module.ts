import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashComponent } from './dash/dash.component';
import { AuthGuardService } from './guards/authguard.service';
import { HelpComponent } from './help/help.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'signin'},
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashComponent , canActivate: [AuthGuardService]},
  { path: 'admin', component: AdminComponent , canActivate: [AuthGuardService]},
  { path: 'help', component: HelpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
