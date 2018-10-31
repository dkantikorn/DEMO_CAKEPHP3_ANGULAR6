import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../_services/users.service';
import { environment } from './../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  formSubmitted = false;
  apiResponse: any;

  updateStatus: Boolean = false;
  user: any = { id: null, username: '', first_name: '', last_name: '', email: '', phone: '', mobile: '' };

  UserForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    username: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(),
    mobile: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UsersService,
    private toastr: ToastrManager
  ) { }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['user-id'];
      if (!id) return;
      this.userService.findUserByUserId(id)
        .subscribe(
          user => {
            this.user = user;
            this.user = this.user.response.data;
            console.log(this.user);
          },
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  /**
   * 
   * Function onUpdateFormSubmit() update user profile with post/put/patch Method
   * @author  sarawutt.b
   */
  onUpdateFormSubmit() {
    this.formSubmitted = true;
    this.userService.updateUserProfile(this.UserForm.value).subscribe(
      success => {
        this.updateStatus = true;
        this.apiResponse = success;
        this.toastr.successToastr(this.apiResponse.response.message, 'Success!', { showCloseButton: true });
        this.router.navigate(['/users']);
        console.log(success);
      },
      error => {
        console.log(error);
        this.toastr.errorToastr(this.apiResponse.response.message, 'Oops!', { showCloseButton: true });
      });
  }//On submit update form

  /**
   * Function making for when you click on go backe button
   * @author  sarawutt.b
   */
  goBack() {
    this.location.back();
  }
}
