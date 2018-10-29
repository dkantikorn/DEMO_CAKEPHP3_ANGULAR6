import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {

  user: any;

  /**
   * API server URL making for pplication get resource from the server
   */
  APIServerURL = environment.apiURL;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UsersService
  ) { }

  ngOnInit() {
    //Find User detail by user-id
    this.findUserByUserId();
  }

  //Function load a user infomation whare match parameter id
  //Function for view page
  findUserByUserId() {
    this.route.params
      .pipe(switchMap((params: Params) => this.userService.findUserByUserId(+params['user-id'])))
      .subscribe(info => this.user = info);
  }

  /**
   * 
   * Function go back when click the back button
   * @author sarawutt.b
   */
  goBack() {
    this.location.back();
  }
}
