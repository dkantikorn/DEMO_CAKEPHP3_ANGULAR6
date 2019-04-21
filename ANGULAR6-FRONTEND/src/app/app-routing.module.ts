import { ParentsComponent } from './components/communications/parents/parents.component';
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
import { PageNotFoundComponent } from './_shared/page-not-found/page-not-found.component';
import { NgIfTemplateComponent } from './tutorials/ng-if-template/ng-if-template.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
//   { path: 'data-binding', component: DataBindingComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'users', component: UsersComponent, canActivate: [AuthGuardGuard] },
//   { path: 'users/detail/:user-id', component: UsersDetailComponent, canActivate: [AuthGuardGuard] },
//   { path: 'users/edit/:user-id', component: UsersEditComponent, canActivate: [AuthGuardGuard] },
//   { path: 'login', component: LoginComponent },
//   { path: 'tutorial/template', component: NgIfTemplateComponent },
//   { path: 'communication', component: ParentsComponent },
//   { path: '**', component: PageNotFoundComponent }
// ];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'data-binding', component: DataBindingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/detail/:user-id', component: UsersDetailComponent },
  { path: 'users/edit/:user-id', component: UsersEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tutorial/template', component: NgIfTemplateComponent },
  { path: 'communication', component: ParentsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
