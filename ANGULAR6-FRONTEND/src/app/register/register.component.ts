import { Component, OnInit, ElementRef } from '@angular/core';

import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../_services/users.service';
import { Location } from '@angular/common';

//Date picker Options set option to the datepicker
import { IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formSubmitted: boolean = false;
  apiResponse: any;
  updateStatus: boolean = false;


  //File attr
  files: FileList;
  fileName: string;

  //User model
  user: any = {
    username: null, password: null, first_name: '', last_name: '', gender: null, email: '', phone: '',
    mobile: '', birth_date: null, picture_path: null
  };

  //Reactive Form Control
  UserForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('', Validators.required),
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    birth_date: new FormControl(null, Validators.required),
    phone: new FormControl(),
    mobile: new FormControl(null, Validators.required),
    picture_path: new FormControl()
  });


  //DatePicker Options
  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private elm: ElementRef,
    private userService: UsersService
  ) { }

  ngOnInit() {
  }

  /**
   * 
   * Function add for new user to the system function do when form valid and you press submit the button
   * @author  sarawutt.b
   */
  addUserProfile() {
    let files = this.elm.nativeElement.querySelector('#UserPictureProfile').files;
    let formData = new FormData();
    let file = files[0];

    this.formSubmitted = true;
    formData.append('picture_path', file, file.name);
    formData.append('username', this.UserForm.get('username').value);
    formData.append('password', this.UserForm.get('password').value);
    formData.append('gender', this.UserForm.get('gender').value);
    formData.append('first_name', this.UserForm.get('first_name').value);
    formData.append('last_name', this.UserForm.get('last_name').value);
    formData.append('email', this.UserForm.get('email').value);
    formData.append('birth_date', this.UserForm.get('birth_date').value.formatted);
    formData.append('phone', this.UserForm.get('phone').value);
    formData.append('mobile', this.UserForm.get('mobile').value);

    this.userService.addUserProfile(formData).subscribe(
      success => {
        //this.router.navigate(['/user']);
        console.log('OK SAVE SUCCESS');
        console.log(success);
        this.apiResponse = success;
      },
      error => console.log(error),
      () => console.log('COMPLETE API')
    );

  }


  /**
   * 
   * Function go bake when you click back
   * @author  sarawutt.b
   */
  goBack() {
    this.location.back();
  }



  /**
   * 
   * Function when user choosing of the input file
   * @author  sarawutt.b
   * @return  void
   */
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    }
  }



  fileChange(event) {
    return this.userService.fileChange(event);
  }

  generateArray(obj: any) {
    return Object.keys(obj).map((key) => { return { key: key, value: obj[key] } });
  }

  /*
  ------------------------------------------------------------------------------------------------------------------------
  TEST FUNCTION BELOW HERE
  ------------------------------------------------------------------------------------------------------------------------
  */


  /**
   * 
   * Test for upload file
   * @author sarawutt.b
   */

  onUploadFile() {
    let files = this.elm.nativeElement.querySelector('#fileInput').files;
    console.log(files);
    let formData = new FormData();
    let file = files[0];
    formData.append('data[User][picture_path]', file, file.name);
    formData.append('data[User][xxx]', 'Foo');
    formData.append('data[User][yyy]', 'BAR');
    // this.userService.uploadProfile(formData);
  }


  /**
   * 
   * Test for upload file
   * @author sarawutt.b
   */
  onChange(files?: FileList) {
    console.log(files);
  }
}
