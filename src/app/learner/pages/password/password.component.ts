import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../../common/_helpers/must-match.validator';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import * as myGlobals from '../../../common/globals';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  currentUser: any = [];
  usersuggestion:any =[];
  passwordForm: FormGroup;
  systemip:String;

  myControl = new FormControl();
  options: string[] = [];
  constructor(private router:Router, private formBuilder: FormBuilder,private alert: AlertServiceService,
    public service : LearnerServicesService) { }

  ngOnInit() {
    var user = localStorage.getItem('UserDetails')
    this.systemip = localStorage.getItem('Systemip')
    this.currentUser = JSON.parse(user);
    this.userNamesuggestion();
    this.passwordForm = this.formBuilder.group({
            username: new FormControl('', myGlobals.usernameVal),
            password: new FormControl('', myGlobals.passwordVal),
            confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
  }, {
    validator: MustMatch('password', 'confirmpassword'),
  });
  }
  get f() { return this.passwordForm.controls; }
  submit(){
    this.service.user_registration_done(this.currentUser.user_id,this.passwordForm.value.username,this.passwordForm.value.password,this.systemip).subscribe(data => {
          if (data.data['user_registration_done']['success'] == 'true') {
            this.alert.openAlert(data.data['user_registration_done'].message,null)
            localStorage.setItem('UserToken',JSON.stringify(data.data['user_registration_done'].token))
            this.router.navigate(['Learner/courses']);
          } else{
            this.alert.openAlert(data.data['user_registration_done'].message,null)
          }
      })
  }

  userNamesuggestion(){
    this.service.userNamesuggestion(this.currentUser.user_id).subscribe(data => {
      if (data.data['user_registration_username_suggestion']['success'] == 'true') {
        // this.alert.openAlert(data.data['user_registration_username_suggestion'].message,null)
        this.options = data.data['user_registration_username_suggestion'].data
        console.log(this.options)
        // localStorage.setItem('UserToken',JSON.stringify(data.data['user_registration_username_suggestion'].message))
        // this.router.navigate(['Learner/courses']);
      } else{
        this.alert.openAlert(data.data['user_registration_username_suggestion'].message,null)
      }
  })
  }
  
}
