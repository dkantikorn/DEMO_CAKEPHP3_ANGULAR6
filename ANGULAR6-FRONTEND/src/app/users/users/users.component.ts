import { ToastrManager } from 'ng6-toastr-notifications';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: any = [];
  userInfo: any = [];
  searchTxt: string;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UsersService,
    private router: Router,
    private toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  searchUser() {
    return true;
  }
  //Function load all user are in the api application
  loadAllUsers() {
    this._userService.loadAllUsers().subscribe(response => {
      this.userList = response;
      this.userList = this.userList.response;
    });
  }

  //Function load a user infomation whare match parameter id
  //Function for view page
  // findUserByUserId(params = null) {
  //   this._userService.findUserByUserId(params).subscribe(response => {
  //     this.userInfo = response;
  //   });

  //   this.router.navigate(['/user/view', params]);
  // }

  // Version making link with routerLink="" directive
  //Function load a user infomation whare match parameter id
  //Function for view page
  routerLinkFindUserByUserId() {
    this._route.params.subscribe(params => {
      const id = params['id'];
      this._userService.findUserByUserId(id).subscribe(response => {
        this.userInfo = response;
      });
    });
  }

  /**
   * 
   * Function add new user
   * @author  sarawutt.b
   */
  addUserProfile() {
    this.router.navigate(['/register']);
  }

  /**
   * 
   * Function delete for the user profile
   * @param   id as integer id of the user
   * @author  sarawutt.b
   */
  deleteUserProfile(user) {
    let response: any;
    if (confirm('Are you sure for delete the user of name ' + user.first_name + ' ' + user.last_name + ' ?')) {
      var index = this.userList.indexOf(user);
      this._userService.deleteUserProfile(user.id).subscribe(
        success => {
          console.log(success);
          response = success;
          if (response.response.status == 'failed') {
            this.toastr.errorToastr(response.response.message, 'Oops!', { showCloseButton: true });
          } else {
            this.userList.splice(index, 1);
            this.toastr.successToastr(response.response.message, 'Success!', { showCloseButton: true });
          }
        },
        error => {
          this.toastr.errorToastr('Could not be delete the user please try again!', 'Oops!', { showCloseButton: true });
          console.log(error)
        },
        () => console.log('COMPLETE API')
      );
    }
  }

}
