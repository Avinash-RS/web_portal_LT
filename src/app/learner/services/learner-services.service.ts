import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { login } from "./operations/learner_query";
import {user_registration,user_registration_mobile_otp_send,user_registration_mobile_otp_verify,
  get_forgot_username_mobile_email,get_forgot_password_byusername,user_registration_username_suggestion,
  user_registration_done,get_forgot_password_byresetpassword} from "./operations/learner_mutation"
@Injectable({
  providedIn: 'root'
})
export class LearnerServicesService {

  constructor(private Apollo: Apollo,) { }

  login(username, password, is_admin) {
    console.log('inside services', username, password,is_admin)
    return this.Apollo.query({
      query: login,
      variables: {
        username: username,
        password: password,
        is_admin : is_admin
      }
    });
  }

  user_registration(email, full_name,termsandconditions) {
    return this.Apollo.query({
      query: user_registration,
      variables: {
        full_name: full_name,
        email: email,
        term_condition:termsandconditions
      }
    });
  }


  submit_otp(user_id,_id,mobile) {
    console.log(user_id,_id,mobile)
    return this.Apollo.query({
      query: user_registration_mobile_otp_send,
      variables: {
        user_id: user_id,
        user: _id,
        mobile_number:mobile
      }
    });
  }

  user_registration_verify(otp,mobile_number){
    return this.Apollo.query({
      query: user_registration_mobile_otp_verify,
      variables: {
        otp: otp,
        mobile_number: mobile_number
       
      }
    });
  }

  user_registration_done(user_id,username,password,created_by_ip) {
    return this.Apollo.query({
      query: user_registration_done,
      variables: {
        user_id: user_id,
        username: username,
        password:password,
        created_by_ip:created_by_ip
      }
    });
  }

  forgotUsernameandPassword(type,subtype,mobile_number,email) {
    return this.Apollo.query({
      query: get_forgot_username_mobile_email,
      variables: {
        type: type,
        subtype:subtype,
        mobile_number:mobile_number,
        email:email

      }
    });
  }
  
  forgotPasswordByUsername(username){
    console.log(username)
    return this.Apollo.query({
      query: get_forgot_password_byusername,
      variables: {
        username:username
      }
    });
  }

  userNamesuggestion(userId){
    return this.Apollo.query({
      query: user_registration_username_suggestion,
      variables: {
        user_id:userId
      }
    });
  }

  resetPassword(username,password){
    return this.Apollo.query({
      query: get_forgot_password_byresetpassword,
      variables: {
        username:username,
        password:password
      }
    });
  }
}