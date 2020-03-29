import gql from "graphql-tag";

export const user_registration = gql`
  mutation user_registration($full_name: String!, $email: String!,$term_condition:Boolean) {
    user_registration(
      full_name: $full_name
      email: $email,
      term_condition:$term_condition
    ) {
      message
      success
      data {
      user_id
      full_name
      email
      _id
      }
      _id
      error
    }
  }
`;

export const user_registration_mobile_otp_send = gql`
  mutation user_registration_mobile_otp_send($user_id: String,$user: String,$mobile_number: String!,$email: String) {
    user_registration_mobile_otp_send(
      user_id:$user_id,
      user: $user,
      mobile_number: $mobile_number,
      email: $email,
      is_active: true
    ) {
      message
      success
    }
  }
`;

export const user_registration_mobile_otp_verify = gql`
  mutation user_registration_mobile_otp_verify($otp:String!,$mobile_number: String!) {
    user_registration_mobile_otp_verify(
      otp: $otp,
      mobile_number:$mobile_number
      
    ) {
      message
      success
      data{
        otp
        _id
        mobile_number
        user_id
        username
      }
    }
  }
`;

export const user_registration_done = gql`
  mutation user_registration_done($user_id: String,$username: String,$password:String!, $created_by_ip: String!) {
    user_registration_done(
      user_id:$user_id,
      username:$username,
      password:$password,
      created_by_ip:$created_by_ip
    ) {
      success
      _id
      message
      token
    }
  }
`;

export const get_forgot_username_mobile_email = gql`
  mutation get_forgot_username_mobile_email($type: String,$subtype:String!, $mobile_number: String,$email: String) {
    get_forgot_username_mobile_email(
      type:$type,
      subtype:$subtype,
      mobile_number:$mobile_number,
      email:$email
    ) {
      success
      message
      
    }
  }
`;

export const get_forgot_password_byusername = gql`
  mutation get_forgot_password_byusername($username: String) {
    get_forgot_password_byusername(
      username:$username,
    ) {
      data{
        value
        type
      }
      message
      success
        
    }
  }
`;


export const user_registration_username_suggestion = gql`
  mutation user_registration_username_suggestion($user_id: String) {
    user_registration_username_suggestion(
      user_id:$user_id,
    ) {
      message
      success
      data
        
    }
  }
`;

export const get_forgot_password_byresetpassword = gql`
  mutation get_forgot_password_byresetpassword($username: String!,$password:String!) {
    get_forgot_password_byresetpassword(
      username:$username,
      password:$password
    ) {
      message
      success
    }
  }
`;
export const view_profile = gql`
  mutation view_profile($user_id: String) {
    view_profile(user_id:$user_id) 
    {
      success
                                message {
                                                full_name
                                                email
                                                user_id
                                                user_dtl {
                                                                is_admin
                                                                user_id
                                                                username
                                                                password
                                                                created_by_ip
                                                }
                                                user_mobile {
                                                                mobile_number
                                                }
                                                user_profile {
                                                                _id
                                                                languages_known
                                                                about_you
                                                                certificate
                                                                user_id
                                                                profile_img
                                                                year_of_birth
                                                                doj_lxp
                                                                progress
                                                                is_active
                                                                gender
                                                                country
                                                                state
                                                                city_town
                                                                student
                                                                professional {
                                                                                total_experience
                                                                                organization
                                                                                job_role
                                                                }
                                                                social_media {
                                                                                link
                                                                                img
                                                                }
                                                                last_login
                                                                created_by_ip
                                                                created_by
                                                                created_on
                                                                updated_by_ip
                                                                updated_on
                                                                updated_by
                                                }
                                                country_detail {
                                                                _id
                                                                countryname
                                                                countryshortcode
                                                                is_active
                                                }
                                                state_detail {
                                                                _id
                                                                statename
                                                                stateshortcode
                                                                country
                                                                is_active
                                                }
                                                district_detail {
                                                                _id
                                                                districtname
                                                                country
                                                                state
                                                                is_active
                                                }
                                                qualification {
                                                                board {
                                                                                _id
                                                                                Board_Id
                                                                                Board_Name
                                                                                is_active
                                                                }
                                                                discipline {
                                                                                _id
                                                                                discipline_id
                                                                                discipline_name
                                                                                discipline_code
                                                                                is_active
                                                                }
                                                                institute_detail {
                                                                                _id
                                                                                institute_id
                                                                                institute_name
                                                                                institute_code
                                                                                is_active
                                                                }
                                                                level_detail {
                                                                                _id
                                                                                level_id
                                                                                level_name
                                                                                level_code
                                                                                is_active
                                                                }
                                                                specification_detail {
                                                                                _id
                                                                                specification_id
                                                                                specification_name
                                                                                specification_code
                                                                                is_active
                                                                }
                                                                university {
                                                                                _id
                                                                                University_Id
                                                                                University_Name
                                                                                is_active
                                                                }
                                                }
                                                language_detail {
                                                                _id
                                                                is_active
                                                                languagecode
                                                                languagename
                                                }
                                                progress
                                }

  }
}
`;

export const get_state_details = gql`
    mutation   get_state_details($_id: String){
      get_state_details(
        _id: $_id
      ) {
        message
    success
    data{
      _id
      statename
      stateshortcode
      country
      created_by
      created_on
      created_by_ip
      updated_on
      updated_by
      updated_by_ip
      is_active
    }
      }
    }
    `;

export const get_district_details = gql`
mutation get_district_details($country: String,$state: String){
	get_district_details(
	country: $country,
	state: $state) {
	  message
    success
    data{
       _id
      districtname
      state
      country
      created_by
      created_on
      created_by_ip
      updated_on
      updated_by
      updated_by_ip
      is_active
    }
} 
}
`;
export const get_change_password_updateprofile = gql`
mutation get_change_password_updateprofile($username: String, $old_password: String $password: String){
  get_change_password_updateprofile(
    username: $username,
    old_password: $old_password,
    password: $password
  ) {
    message
success
  }
}
`;
export const update_profile = gql`
  mutation update_profile($user_id: String, $profile_img: String, $year_of_birth: String, $doj_lxp: String,$qualification: [qualification_content],
    $social_media: [social_media_content], $is_active: Boolean, $progress: String, $gender: String, $languages_known: [String],
    $country: String, $state: String, $city_town: String, $about_you: String, $certificate: [String], $student: String,
    $professional: professional_content, $last_login: String, $created_by_ip: String, $created_by: String, $created_on: String,
    $updated_by_ip: String, $updated_on: String, $updated_by: String){
    update_profile(
      user_id: $user_id,
      profile_img: $profile_img,
      year_of_birth: $year_of_birth,
      doj_lxp: $doj_lxp,
      qualification: $qualification,
      social_media: $social_media,
      is_active: $is_active,
      progress: $progress,
      gender: $gender,
      languages_known: $languages_known,
      country: $country,
      state: $state,
      city_town: $city_town,
      about_you: $about_you,
      certificate: $certificate,
      student: $student,
      professional: $professional,
      last_login: $last_login,
      created_by_ip: $created_by_ip,
      created_by: $created_by,
      created_on: $created_on,
      updated_by_ip: $updated_by_ip,
      updated_on: $updated_on,
      updated_by: $updated_by
    ) {
      success
      message

    }
  }
`;
export const update_mobile_onprofile = gql`
mutation update_mobile_onprofile($user_id: String, $mobile_number: String){
	update_mobile_onprofile(
    user_id: $user_id,
    mobile_number: $mobile_number,
    ) {
	    message
    success
}
}
`;
export const  update_verifyotp_mobile_onprofile = gql`
  mutation  update_verifyotp_mobile_onprofile($user_id: String, $mobile_number: String, $otp: String){
    update_verifyotp_mobile_onprofile(
      user_id: $user_id,
      mobile_number: $mobile_number,
      otp: $otp
    ) {
      success
      message
    }
  }
`;
export const update_email_onprofile = gql`
  mutation update_email_onprofile($user_id: String, $email: String){
    update_email_onprofile(
      user_id: $user_id,
      email: $email
    ) {
      message
      success
    }
  }
`;