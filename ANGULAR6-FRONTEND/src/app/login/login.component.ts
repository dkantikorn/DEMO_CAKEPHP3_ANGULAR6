import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // this.toastr.successToastr('ลงชื่อออกเรียบร้อยแล้ว', 'Success!');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * 
   * Function login component 
   * @author  sarawutt.b
   */
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      user => {
        console.log(user);
        let status = user.response.status || 'failed';
        if (status == 'failed') {
          this.toastr.errorToastr(user.response.message, 'Oops!');
        } else {
          this.toastr.successToastr(user.response.message, 'Success!');
        }

        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.toastr.errorToastr('Bad Request Pleast try again!', 'Oops!');
        this.loading = false;
      });
  }

}
