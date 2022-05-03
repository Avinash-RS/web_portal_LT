import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent implements OnInit {
routeParams;
secretKey = '(!@#Passcode!@#)';

  constructor( private service: LearnerServicesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.routeParams = params;
      if (params) {
        this.goToCourse();
      }
      console.log(params); // Print the parameter to the console.
  });
  }

  goToCourse() {
    this.service.learner_login(this.routeParams.queValue, this.routeParams.rpValue, this.routeParams.dpValue)
      .subscribe((loginresult: any) => {
        if (loginresult.data.learner_login) {
          if (loginresult.data.learner_login.success) {
            const userId = loginresult.data.learner_login.message.user_id;
            this.loginMovement(loginresult);
          }
        }
      });
  }

  loginMovement(loginresult) {
    localStorage.setItem('Fullname', loginresult.data.learner_login.message.full_name);
    var id = CryptoJS.AES.encrypt(loginresult.data.learner_login.message.user_id, this.secretKey.trim()).toString();
    loginresult.data.learner_login.message.user_id = id;
    loginresult.data.learner_login.message.specific_report_value = '';
    loginresult.data.learner_login.message.is_password_updated = true;
    localStorage.setItem('token', loginresult.data.learner_login.message.token);
    localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.learner_login.message));
    localStorage.setItem('remember_me', 'false');
    localStorage.setItem('user_img', loginresult.data.learner_login.message.profile_img);
    localStorage.setItem('role', 'learner');
    this.setAuthentication();
}
setAuthentication() {
  let userDetail = JSON.parse(localStorage.getItem('UserDetails'));
  userDetail['specific_report_value'] = Math.floor(Math.random() * 1000000000).toString();
  localStorage.setItem('UserDetails', JSON.stringify(userDetail));
  if (userDetail.org_type === 'Corporate') {
    this.router.navigate(['/Learner/upskillcalendar']);
  } else {
    this.router.navigate(['/Learner/MyCourse']);
  }}
}
