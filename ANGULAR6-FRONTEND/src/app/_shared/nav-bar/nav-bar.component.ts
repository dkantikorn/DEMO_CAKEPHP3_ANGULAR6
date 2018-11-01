import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  constructor(private authenticationService: AuthenticationService) {
    //this.isPassAuthorize = this.authenticationService.isLoggedIn();
    // this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    // console.log(this.isLoggedIn$);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    console.log(this.isLoggedIn$);
  }

}
