import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../../../common/_helpers/must-match.validator';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/common/services/handlers/alert-service.service';
import * as myGlobals from '../../../common/globals'; 
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  currentUser:any = [];
  user:any;
  constructor(private router:Router, private formBuilder: FormBuilder,private alert: AlertServiceService,
    public service : LearnerServicesService) { }

  ngOnInit() {
    this.user = localStorage.getItem('UserDetails')
    this.currentUser = JSON.parse(this.user)
    this.resetForm = this.formBuilder.group({
      // username: new FormControl('', myGlobals.usernameVal),
      password: new FormControl('', myGlobals.passwordVal),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
}, {
validator: MustMatch('password', 'confirmpassword'),
});
  }
  get f() { return this.resetForm.controls; }

  resetpassword(){
    this.service.resetPassword(this.currentUser.username,this.resetForm.value.password).subscribe(data => {
      if (data.data['get_forgot_password_byresetpassword']['success'] == 'true') {
        this.alert.openAlert(data.data['get_forgot_password_byresetpassword'].message,null)
        
        this.router.navigate(['Learner/login']);
      } else{
        this.alert.openAlert(data.data['get_forgot_password_byresetpassword'].message,null)
      }
  })
  }
}