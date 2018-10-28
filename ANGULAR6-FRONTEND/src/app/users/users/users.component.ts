import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: any = [];
  userInfo: any = [];
  searchTxt: string;

  constructor(private _route: ActivatedRoute, private _userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  searchUser(){
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
  findUserByUserId(params = null) {
    this._userService.findUserByUserId(params).subscribe(response => {
      this.userInfo = response;
    });

    this.router.navigate(['/user/view', params]);
  }

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
    if (confirm('Are you sure for delete the user of name ' + user.first_name + ' ' + user.last_name + ' ?')) {
      var index = this.userList.indexOf(user);
      this.userList.splice(index, 1);
      this._userService.deleteUserProfile(user.id).subscribe(
        success => {
          console.log(success);
          // if (success.message.type == 'ERROR') {
          //   alert('Could not be delete the user please try again!');
          //   this.userList.splice(index, 0, { User: user });
          // }
        },
        error => {
          alert('Could not be delete the user please try again!');
          this.userList.splice(index, 0, { User: user });
          console.log(error)
        },
        () => console.log('COMPLETE API')
      );
    }
  }

}
