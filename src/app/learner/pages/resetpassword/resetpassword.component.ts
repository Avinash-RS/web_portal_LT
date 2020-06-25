import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '@core/services/_helpers/must-match.validator';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as myGlobals from '@core/globals'; 
import { ToastrService } from 'ngx-toastr';
///////decrypt
 
import SimpleCrypto from "simple-crypto-js";
var _secretKey = "myTotalySecretKey";
var simpleCrypto = new SimpleCrypto(_secretKey);

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
  lowercase: boolean = false;
  uppercase: boolean = false;
  number: boolean = false;
  spicalcharacter: boolean = false;
  showpassbutton: Boolean = false;
  showpsseye: Boolean = false;
  showconpassbutton: Boolean = false;
  showconpsseye: Boolean = false;
  isLinkActive: Boolean;
  constructor(
    private loader : Ng4LoadingSpinnerService,
    private router:Router, 
    private formBuilder: FormBuilder,
    private activeroute: ActivatedRoute,
    private toastr: ToastrService,
    public service : LearnerServicesService) { }

  ngOnInit() {

    this.activeroute.queryParams.subscribe(params => {
      if(params["code"]){
        const decryptedString = simpleCrypto.decrypt(params["code"]);
        this.user = decryptedString;
        this.get_user_detail_username(this.user)
      }  
     else{
      this.user = localStorage.getItem('Username')
      this.isLinkActive = true
     } 
    })

  

    this.resetForm = this.formBuilder.group({
      password: new FormControl('', myGlobals.passwordVal),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(20), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
}, {
validator: MustMatch('password', 'confirmpassword'),
});
  }
  get f() { return this.resetForm.controls; }
  showPassword() {
    this.showpassbutton = !this.showpassbutton;
    this.showpsseye = !this.showpsseye;
  }
  showconPassword(){
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


  resetpassword(){
    this.loader.show();
    this.service.resetPassword( this.user,this.resetForm.value.password).subscribe(data => {
      if (data.data['get_forgot_password_byresetpassword']['success'] == 'true') {
        this.loader.hide();
        this.toastr.success(data.data['get_forgot_password_byresetpassword'].message);
        localStorage.removeItem('Username');
        localStorage.removeItem('Details_user');
        localStorage.removeItem('UserDetails');
        localStorage.removeItem('role');

        this.router.navigate(['/Learner/login']);

      } else{
        this.loader.hide();
        this.toastr.error(data.data['get_forgot_password_byresetpassword'].message,null)
      }
  })
  }

  get_user_detail_username(name){
    try {
      this.service.get_user_detail_username(name).subscribe((data: any) => {
        this.isLinkActive = data.data.get_user_detail_username && data.data.get_user_detail_username.message === 'Link not expired' ?
          true : false;
      })  
    } catch (error) {
        throw error 
    }
  }

}