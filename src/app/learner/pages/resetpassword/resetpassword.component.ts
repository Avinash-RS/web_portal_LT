import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import * as myGlobals from '@core/globals'; 
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  currentUser:any = [];
  user:any;
  username:any;
  constructor(
    private loader : Ng4LoadingSpinnerService,
    private router:Router, 
    private formBuilder: FormBuilder,
    private activeroute: ActivatedRoute,
    private alert: AlertServiceService,
    public service : LearnerServicesService) { }

  ngOnInit() {

    this.activeroute.queryParams.subscribe(params => {
      this.user = params["user_id"]
      this.username=this.user
      console.log(this.user)
    })
    this.resetForm = this.formBuilder.group({
      password: new FormControl('', myGlobals.passwordVal),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
}, {
validator: MustMatch('password', 'confirmpassword'),
});
  }
  get f() { return this.resetForm.controls; }

  resetpassword(){
    this.loader.show();
    this.service.resetPassword(this.username,this.resetForm.value.password).subscribe(data => {
      if (data.data['get_forgot_password_byresetpassword']['success'] == 'true') {
        this.loader.hide();
        this.alert.openAlert(data.data['get_forgot_password_byresetpassword'].message,null)
        
        this.router.navigate(['Learner/login']);
      } else{
        this.loader.hide();
        this.alert.openAlert(data.data['get_forgot_password_byresetpassword'].message,null)
      }
  })
  }
}