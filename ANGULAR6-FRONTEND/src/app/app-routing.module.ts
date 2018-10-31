import { AuthGuardGuard } from './_guard/auth-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users/users.component';
import { LoginComponent } from './login/login.component';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'data-binding', component: DataBindingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardGuard] },
  { path: 'users/detail/:user-id', component: UsersDetailComponent, canActivate: [AuthGuardGuard] },
  { path: 'users/edit/:user-id', component: UsersEditComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
