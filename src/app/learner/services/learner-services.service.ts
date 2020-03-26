import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { login,get_course_by_user,list_content,syllabus_of_particular_scorm } from "./operations/learner_query";
import {user_registration,user_registration_mobile_otp_send,user_registration_mobile_otp_verify,
  get_forgot_username_mobile_email,get_forgot_password_byusername,user_registration_username_suggestion,
  user_registration_done,get_forgot_password_byresetpassword} from "./operations/learner_mutation"
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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


  submit_otp(user_id,_id,mobile,email) {
    console.log(user_id,_id,mobile)
    return this.Apollo.query({
      query: user_registration_mobile_otp_send,
      variables: {
        user_id: user_id,
        user: _id,
        mobile_number:mobile,
        email:email,
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
  getMyCourse(user_id) {
    console.log('inside services', user_id)
    return this.Apollo.query({
      query: get_course_by_user,
      variables: {
        user_id: user_id,
      }
    });
  }
  // submit_otp(user_id,_id,mobile) {
  //   return this.Apollo.query({
  //     query: user_registration_mobile_otp_send,
  //     variables: {
  //       mobile_number:mobile,
  //       user_id:user_id,
  //       user:_id,

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
  list_content(){
    return this.Apollo.query({
      query:list_content,
      variables:{
        
      }
    })
  }
  syllabus_of_particular_scorm(contentid){
    return this.Apollo.query({
      query:syllabus_of_particular_scorm,
      variables:{
        contentid:contentid
      }
    })
  }
}