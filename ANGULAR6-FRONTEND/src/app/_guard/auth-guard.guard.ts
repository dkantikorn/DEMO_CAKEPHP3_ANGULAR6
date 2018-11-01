import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  // constructor(private router: Router) { }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (localStorage.getItem('currentUser')) {
  //     return true;// logged in so return true
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }

  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticationService.isLoggedIn
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }

}
