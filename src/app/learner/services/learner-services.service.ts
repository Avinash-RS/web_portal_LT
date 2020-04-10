import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";

import {
  login, get_course_by_user, get_country_details, get_qualification_details,
  get_board_university_details, get_discipline_details, get_specification_details,
  get_institute_details, get_language_details, get_user_detail, list_content, syllabus_of_particular_scorm
} from "./operations/learner_query";

import {
  user_registration, user_registration_mobile_otp_send, user_registration_mobile_otp_verify,
  get_forgot_username_mobile_email, get_forgot_password_byusername, user_registration_username_suggestion,
  view_profile, get_state_details, user_registration_done, get_forgot_password_byresetpassword,
  get_district_details, get_change_password_updateprofile, update_mobile_onprofile,
  update_verifyotp_mobile_onprofile, update_email_onprofile, update_profile, resend_otp_onprofile
} from "./operations/learner_mutation"

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})
export class LearnerServicesService {

  constructor(private Apollo: Apollo, private http: HttpClient, ) { }

  login(username, password, is_admin) {
    console.log('inside services', username, password, is_admin)
    return this.Apollo.query({
      query: login,
      variables: {
        username: username,
        password: password,
        is_admin: is_admin
      }
    });
  }

  imageupload(fb) {
    return this.http.post<any[]>(environment.apiUrlImg + `upload/image`, fb);
  }

  user_registration(email, full_name, termsandconditions) {
    return this.Apollo.query({
      query: user_registration,
      variables: {
        full_name: full_name,
        email: email,
        term_condition: termsandconditions
      }
    });
  }

  submit_otp(user_id, _id, mobile, email) {
    return this.Apollo.query({
      query: user_registration_mobile_otp_send,
      variables: {
        user_id: user_id,
        user: _id,
        mobile_number: mobile,
        email: email,
      }
    });
  }

  user_registration_verify(otp, mobile_number) {
    return this.Apollo.query({
      query: user_registration_mobile_otp_verify,
      variables: {
        otp: otp,
        mobile_number: mobile_number

      }
    });
  }

  user_registration_done(user_id, username, password, created_by_ip) {
    return this.Apollo.query({
      query: user_registration_done,
      variables: {
        user_id: user_id,
        username: username,
        password: password,
        created_by_ip: created_by_ip
      }
    });
  }
  view_profile(user_id) {
    console.log('view', user_id)
    return this.Apollo.query({
      query: view_profile,
      variables: {
        user_id: user_id
      }
    });
  }
  get_country_details() {
    return this.Apollo.query({
      query: get_country_details,
    })
  }
  get_state_details(_id) {
    return this.Apollo.query({
      query: get_state_details,
      variables: {
        _id: _id
      }
    })
  }
  getMyCourse(user_id) {
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

  userNamesuggestion(userId) {
    return this.Apollo.query({
      query: user_registration_username_suggestion,
      variables: {
        user_id: userId
      }
    });
  }
  forgotUsernameandPassword(type, subtype, mobile_number, email) {
    return this.Apollo.query({
      query: get_forgot_username_mobile_email,
      variables: {
        type: type,
        subtype: subtype,
        mobile_number: mobile_number,
        email: email

      }
    });
  }
  forgotPasswordByUsername(username) {
    console.log(username)
    return this.Apollo.query({
      query: get_forgot_password_byusername,
      variables: {
        username: username
      }
    });
  }
  resetPassword(username, password) {
    return this.Apollo.query({
      query: get_forgot_password_byresetpassword,
      variables: {
        username: username,
        password: password
      }
    });
  }
  get_qualification_details() {
    return this.Apollo.query({
      query: get_qualification_details,
    })
  }
  get_board_university_details() {
    return this.Apollo.query({
      query: get_board_university_details,
    });
  }

  get_district_details(country, state) {
    return this.Apollo.query({
      query: get_district_details,
      variables: {
        country: country,
        state: state
      }
    });
  }

  get_change_password_updateprofile(username, old_password, password) {
    return this.Apollo.query({
      query: get_change_password_updateprofile,
      variables: {
        username: username,
        old_password: old_password,
        password: password
      }
    })
  }
  get_discipline_details() {
    return this.Apollo.query({
      query: get_discipline_details,
    })
  }
  get_specification_details() {
    return this.Apollo.query({
      query: get_specification_details,
    })
  }
  get_institute_details() {
    return this.Apollo.query({
      query: get_institute_details,
    })
  }
  get_language_details() {
    return this.Apollo.query({
      query: get_language_details,
    })
  }

  update_mobile_onprofile(user_id, mobile_number) {
    return this.Apollo.query({
      query: update_mobile_onprofile,
      variables: {
        user_id: user_id,
        mobile_number: mobile_number
      }
    })
  }

  update_verifyotp_mobile_onprofile(user_id, mobile_number, otp) {
    return this.Apollo.query({
      query: update_verifyotp_mobile_onprofile,
      variables: {
        user_id: user_id,
        mobile_number: mobile_number,
        otp: otp
      }
    })
  }
  get_user_detail(email) {
    return this.Apollo.query({
      query: get_user_detail,
      variables: {
        email: email
      }
    });
  }

  update_email_onprofile(user_id, email) {
    return this.Apollo.query({
      query: update_email_onprofile,
      variables: {
        user_id: user_id,
        email: email
      }
    })
  }
  list_content() {
    return this.Apollo.query({
      query: list_content,
      variables: {

      }
    })
  }
  syllabus_of_particular_scorm(contentid) {
    return this.Apollo.query({
      query: syllabus_of_particular_scorm,
      variables: {
        contentid: contentid
      }
    })
  }

  update_profile(userData) {
    return this.Apollo.query({
      query: update_profile,
      variables: userData
    })
  }
  resend_otp_onprofile(user_id) {
    return this.Apollo.query({
      query: resend_otp_onprofile,
      variables: {
        user_id: user_id
      }
    })
  }
};



