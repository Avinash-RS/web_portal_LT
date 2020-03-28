import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/./core/services/handlers/alert-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as myGlobals from '@core/globals'; 

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
  userid:any;
  // myControl = new FormControl();
  options: string[] = [];
  constructor(private router:Router, 
    private loader : Ng4LoadingSpinnerService,
    private formBuilder: FormBuilder,
    private alert: AlertServiceService,
    public service : LearnerServicesService) { }

  ngOnInit() {
    
    
    var user = localStorage.getItem('UserDetails')
    this.systemip = localStorage.getItem('Systemip')
    this.currentUser = JSON.parse(user);
    this.userNamesuggestion();
    this.passwordForm = this.formBuilder.group({
            username: new FormControl('', myGlobals.usernameVal),
            password: new FormControl('', myGlobals.passwordVal),
            // confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
  }, {
    validator: MustMatch('password', 'confirmpassword'),
  });
  
  }
  get pf() { return this.passwordForm.controls; }
  submit(){
    this.loader.show();
    this.userid=localStorage.getItem('key')
    this.service.user_registration_done(this.userid,this.passwordForm.value.username,this.passwordForm.value.password,this.systemip).subscribe(data => {
          if (data.data['user_registration_done']['success'] == 'true') {
            this.loader.hide();
            this.alert.openAlert(data.data['user_registration_done'].message,null)
            localStorage.setItem('UserToken',JSON.stringify(data.data['user_registration_done'].token))
            this.router.navigate(['/Learner/MyCourse']);
          } else{
            this.loader.hide();
            this.alert.openAlert(data.data['user_registration_done'].message,null)
          }
      })
  }

  userNamesuggestion(){
    this.userid=localStorage.getItem('key')
    this.service.userNamesuggestion(this.userid).subscribe(data => {
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
