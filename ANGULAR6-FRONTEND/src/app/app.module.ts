import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { NavBarComponent } from './_shared/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
//Mydatepicker angular2 Plugin
import { MyDatePickerModule } from 'mydatepicker';

import { ToastrModule } from 'ng6-toastr-notifications';
import { UsersComponent } from './users/users/users.component';
import { UserFilterPipe } from './users/pipe/user-filter.pipe';


//Pagination Plugin Module
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { UsersDetailComponent } from './users/users-detail/users-detail.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { PageNotFoundComponent } from './_shared/page-not-found/page-not-found.component';
import { NgIfTemplateComponent } from './tutorials/ng-if-template/ng-if-template.component';
import { ParentsComponent } from './components/communications/parents/parents.component';
import { ChildOneComponent } from './components/communications/child-one/child-one.component';
import { ChildTwoComponent } from './components/communications/child-two/child-two.component';

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    UsersComponent,
    UserFilterPipe,
    LoginComponent,
    UsersDetailComponent,
    UsersEditComponent,
    PageNotFoundComponent,
    NgIfTemplateComponent,
    ParentsComponent,
    ChildOneComponent,
    ChildTwoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
