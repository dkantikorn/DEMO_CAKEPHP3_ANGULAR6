import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpRequest, HttpErrorResponse, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  // /**
  //  * 
  //  * Function Login make thing authentication
  //  * @author  sarawutt.b
  //  * @param username 
  //  * @param password 
  //  */
  // login(username: string, password: string) {
  //   let formData = new FormData();
  //   formData.append('username', username);
  //   formData.append('password', password);
  //   return this.http.post(`${environment.apiURL}/users/login.json`, formData)
  //     .pipe(map((response: Response) => {
  //       //console.log(response);
  //       // login successful if there's a jwt token in the response
  //       let user = response.json();
  //       console.log(user);
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //       return response = response.json();
  //     }));
  // }

  // /**
  //  * 
  //  * Function logout take a current user in the session logged out
  //  * @author  satawutt.b
  //  */
  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  // }

  /**
  * 
  * Function Login make thing authentication
  * @author  sarawutt.b
  * @param username 
  * @param password 
  */
  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiURL}/users/login.json`, { username: username, password: password })
      .pipe(map(user => {
        console.log(user.response.token);
        // login successful if there's a jwt token in the response
        if (user && user.response.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.response.data));
        }

        return user;
      }));
  }

  /**
   * 
   * Function logout take a current user in the session logged out
   * @author  satawutt.b
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  /**
   * 
   * Function check user has already logged in
   * @author  sarawutt.b
   * @return  boolean
   */
  isLoggedIn() {
    if (localStorage.getItem("currentUser") === null) {
      return false;
    }

    return true;
  }

}
