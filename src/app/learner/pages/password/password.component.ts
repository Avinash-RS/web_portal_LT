import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../../common/_helpers/must-match.validator';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  currentUser: any = []
  passwordForm: FormGroup;
  systemip:String;
  constructor(private router:Router, private formBuilder: FormBuilder,private alert: AlertServiceService,
    private cookieService: CookieService,public service : LearnerServicesService) { }

  ngOnInit() {
    var user = this.cookieService.get('UserDetails')
    this.systemip = localStorage.getItem('Systemip')
    this.currentUser = JSON.parse(user);
    this.passwordForm = this.formBuilder.group({
            username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/), Validators.minLength(3), Validators.maxLength(20)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
            confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
  }, {
    validator: MustMatch('password', 'confirmpassword'),
  });
  }
  get f() { return this.passwordForm.controls; }
  submit(){
    this.service.user_registration_done(this.currentUser.user_id,this.passwordForm.value.username,this.passwordForm.value.password,this.systemip).subscribe(data => {
          if (data.data['user_registration_done']['success'] == 'true') {
            this.alert.openAlert(data.data['user_registration_done'].statusmsg,null)
            localStorage.setItem('UserToken',JSON.stringify(data.data['user_registration_done'].message))
            this.router.navigate(['/courses']);
          } else{
            this.alert.openAlert(data.data['user_registration_done'].statusmsg,null)
          }
      })
  }
  
}
