import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
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
  usersuggestion: any = [];
  passwordForm: FormGroup;
  systemip: String;
  userid: any;
  options: string[] = [];
  lowercase: boolean = false;
  uppercase: boolean = false;
  number: boolean = false;
  spicalcharacter: boolean = false;
  showpassbutton: Boolean = false;
  showpsseye: Boolean = false;
  showconpassbutton: Boolean = false;
  showconpsseye: Boolean = false;

  constructor(private router: Router,
    private loader: Ng4LoadingSpinnerService,
    private formBuilder: FormBuilder,
    private alert: AlertServiceService,
    public service: LearnerServicesService) { }

  ngOnInit() {
    this.systemip = localStorage.getItem('Systemip')
    this.userNamesuggestion();
    this.passwordForm = this.formBuilder.group({
      username: new FormControl('', myGlobals.usernameVal),
      password: new FormControl('', myGlobals.passwordVal),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
    }, {
      validator: MustMatch('password', 'confirmpassword'),
    });

  }
  get pf() { return this.passwordForm.controls; }

  showPassword() {
    this.showpassbutton = !this.showpassbutton;
    this.showpsseye = !this.showpsseye;
  }
  showconPassword() {
    this.showconpassbutton = !this.showconpassbutton;
    this.showconpsseye = !this.showconpsseye;
  }
  change(event) {
    if (event.target.value.match(myGlobals.lowerCaseLetters)) {
      this.lowercase = true;
    } else {
      this.lowercase = false;
    }
    if (event.target.value.match(myGlobals.upperCaseLetters)) {
      this.uppercase = true;
    } else {
      this.uppercase = false;
    }
    if (event.target.value.match(myGlobals.numbers)) {
      this.number = true;
    } else {
      this.number = false;
    }
    if (event.target.value.match(myGlobals.specialchar)) {
      this.spicalcharacter = true;
    } else {
      this.spicalcharacter = false;
    }

  }
  submit() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('token');
    localStorage.removeItem('adminDetails');
    this.loader.show();
    this.userid = localStorage.getItem('key')
    this.service.user_registration_done(this.userid, this.passwordForm.value.username, this.passwordForm.value.password, this.systemip).subscribe(data => {
      if (data.data['user_registration_done']['success'] == 'true') {
        //Added by Mythreyi - for user story 19 first time login
        this.service.login(this.passwordForm.value.username, this.passwordForm.value.password, false)
          .subscribe((loginresult: any) => {
            if (loginresult.data.login) {
              if (loginresult.data.login.success) {
                localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message))
                localStorage.setItem('user_img', loginresult.data.login.message.profile_img);
                localStorage.setItem('uname', this.passwordForm.value.username);
                localStorage.setItem('role', 'learner');
                localStorage.setItem('token', loginresult.data.login.message.token)
                localStorage.setItem('UserToken', JSON.stringify(data.data['user_registration_done'].token))
                var ps = btoa(this.passwordForm.value.password);
                localStorage.setItem('ps', ps);
                this.loader.hide();
                //if false, then need to update profile
                if (loginresult.data.login.message.is_profile_updated)
                  this.router.navigate(['/Learner'])
                else {
                  this.alert.openAlert('Your profile is incomplete !','Please provide data for all mandatory fields')
                  this.router.navigate(['/Learner/profile'])
                }
              }
            } else {
              this.loader.hide();
              this.passwordForm.reset();
              this.alert.openAlert(loginresult.data.login.error_msg, null)
            }
          });
      } else {
        this.loader.hide();
        this.alert.openAlert(data.data['user_registration_done'].message, null)
      }
    })
  }

  userNamesuggestion(data?) {
    this.userid = localStorage.getItem('key')
    this.service.userNamesuggestion(this.userid).subscribe(data => {
      if (data.data['user_registration_username_suggestion']['success'] == 'true') {
        this.options = data.data['user_registration_username_suggestion'].data
      } else {
        this.alert.openAlert(data.data['user_registration_username_suggestion'].message, null)
      }
    })
  }

  /* function that checks for existing user or not on blur event in username field */
  checkForExistingUser() {
    if (this.passwordForm.value.username) {
      try {
        this.service.check_existing_user(this.passwordForm.value.username).subscribe((data: any) => {
          if (data.data.check_existing_user && data.data.check_existing_user.message === 'Username already exists') {
            this.alert.openAlert(data.data['check_existing_user'].message, null)
          }
        })
      } catch (error) {
        throw error
      }
    }
  }
}
