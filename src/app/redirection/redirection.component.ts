import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent implements OnInit {
routeParams;
secretKey = "(!@#Passcode!@#)";

  constructor( private service: LearnerServicesService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.routeParams = params
      if(params){
        this.goToCourse()
      }
      console.log(params); // Print the parameter to the console. 
  });
  }

  goToCourse(){
    this.service.login(this.routeParams.queValue, this.routeParams.rpValue, false,this.routeParams.dpValue)
      .subscribe((loginresult: any) => {
        if(loginresult.data.login){
          if (loginresult.data.login.success) {
            let userId = loginresult.data.login.message.user_id
            this.loginMovement(loginresult)
          }
        }
        
        
      });
  }

  loginMovement(loginresult){
    localStorage.setItem('Fullname', loginresult.data.login.message.full_name);
    var id = CryptoJS.AES.encrypt(loginresult.data.login.message.user_id, this.secretKey.trim()).toString(); 
    loginresult.data.login.message.user_id = id
    loginresult.data.login.message.specific_report_value = '';
    loginresult.data.login.message.is_password_updated = true;
    localStorage.setItem('token', loginresult.data.login.message.token);
      localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message));
      localStorage.setItem('remember_me', 'false');
      localStorage.setItem('user_img', loginresult.data.login.message.profile_img);
      localStorage.setItem('role', 'learner');
      this.setAuthentication();
}
setAuthentication(){
  let userDetail =JSON.parse(localStorage.getItem('UserDetails'))
  userDetail['specific_report_value'] = Math.floor(Math.random() * 1000000000).toString()
  localStorage.setItem('UserDetails', JSON.stringify(userDetail));
  setTimeout(()=>{
    this.router.navigate(['/Learner/MyCourse']);
  },1000)
}
}
