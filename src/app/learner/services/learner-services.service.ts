import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { login , get_country_details} from "./operations/learner_query";
import {user_registration,user_registration_mobile_otp_send,user_registration_mobile_otp_verify,
  user_registration_done, view_profile, get_state_details} from "./operations/learner_mutation";
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

  user_registration_verify(mobile_number,otp){
    return this.Apollo.query({
      query: user_registration_mobile_otp_verify,
      variables: {
        mobile_number: mobile_number,
        otp: otp,
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
  view_profile(user_id){
    console.log('view',user_id)
    return this.Apollo.query({
      query: view_profile,
      variables: {
        user_id: user_id
      }
    });
  }
  get_country_details(){
    return this.Apollo.query({
      query: get_country_details,
    })
  }
  get_state_details(_id){
    return this.Apollo.query({
      query: get_state_details,
      variables: {
        _id: _id
      }
    })
  }
  
  // submit_otp(user_id,_id,mobile) {
  //   return this.Apollo.query({
  //     query: user_registration_mobile_otp_send,
  //     variables: {
  //       mobile_number:mobile,
  //       user_id:user_id,
  //       user:_id,

  //     }
  //   });
  // }
}