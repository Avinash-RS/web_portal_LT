import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../../common/_helpers/must-match.validator';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  currentUser: any = []
  passwordForm: FormGroup;
  systemip:String;
  constructor(private router:Router, private formBuilder: FormBuilder, 
    public service : LearnerServicesService) { }

  ngOnInit() {
    var user = localStorage.getItem('UserDetails')
    this.systemip = localStorage.getItem('Systemip')
    this.currentUser = JSON.parse(user);
    this.passwordForm = this.formBuilder.group({
            username: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z 0-9]+$/), Validators.minLength(3), Validators.maxLength(100)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
            confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
  }, {
    validator: MustMatch('password', 'confirmpassword'),
  });
  }
  get f() { return this.passwordForm.controls; }
  otpverification(){
    this.service.user_registration_done(this.currentUser.user_id,this.passwordForm.value.username,this.passwordForm.value.password,this.systemip).subscribe(data => {
        console.log(data.data['user_registration_done'])
          if (data.data['user_registration_done']['success'] == 'true') {
            console.log('in')
            alert(data.data['user_registration_done'].message)
            this.router.navigate(['/password']);
          
          } 
      })
  }
  
}
