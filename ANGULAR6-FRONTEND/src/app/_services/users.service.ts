import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpErrorResponse, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  //Function load all user are in the api application
  loadAllUsers() {
    return this.http.get(`${environment.apiURL}/users/loadAllUsers.json`);
  }

  //Function load a user infomation whare match parameter id
  findUserByUserId(id) {
    return this.http.get(`${environment.apiURL}/users/findUserByUserId/${id}.json`);
  }

  /**
   * 
   * Function add / register for user profile
   * @author sarawutt.b
   * @param user as a object of user information
   */
  addUserProfile(user: any) {
    return this.http.post(`${environment.apiURL}/users/addUserProfile.json`, user);
  }

  /**
   * 
   * Function update for user profile
   * @author sarawutt.b
   * @param user as a object of user information
   */
  updateUserProfile(user: any) {
    return this.http.put(`${environment.apiURL}/users/updateUserProfile/${user.id}.json`, user);
  }

  /**
   * 
   * Function delete for the user profile
   * @param   id as integer id of the user
   * @author  sarawutt.b
   */
  deleteUserProfile(id: any) {
    return this.http.post(`${environment.apiURL}/users/deleteUserProfile/${id}.json`, JSON.stringify({ id: id }));
  }



  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }




  /**
 * 
 * Function upload file
 * @param event 
 */
  uploadProfile(formData?: any) {
    return this.http.post(`${environment.apiURL}/users/uploadProfile.json`, formData)
      .subscribe(
        data => console.log('success'),
        error => console.log(error)
      )
  }

  /**
 * 
 * Function upload file
 * @param event 
 */
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      //let headers = new Headers();
      /** No need to include Content-Type in Angular 4 */
      //headers.append('Content-Type', 'multipart/form-data');
      //headers.append('Accept', 'application/json');
      // let options = new RequestOptions({ headers: headers });
      this.http.post(`${environment.apiURL}/users/uploadProfile.json`, formData)
        .subscribe(
          data => console.log('success'),
          error => console.log(error)
        )
    }
  }
}
