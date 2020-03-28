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
      message {
full_name
email,
user_id
user_mobile{
mobile_number,

}
user_profile{
_id
qualification{
qualification
institute
discipline
year_of_passing
percentage

}
social_media{
link
img
}
languages_known
about_you
certificate
user_id
profile_img
year_of_birth
created_on
progress
is_active
gender
country
state
city_town
student
last_login
created_by
updated_on
updated_by
updated_by_ip

}
}
success
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
mutation get_change_password_updateprofile($username: String, $password: String){
  get_change_password_updateprofile(
    username: $username,
    password: $password
  ) {
    message
success
  }
}
`;
// export const update_profile = gql`
//   mutation update_profile($user_id: String, $profile_img: String, $year_of_birth: String, $doj_lxp: String,){
//     update_profile(
//       user_id: $user_id,
//       profile_img: $profile_img,
//       year_of_birth: $year_of_birth,
//       doj_lxp: $doj_lxp
//     ) {

//     }
//   }
// `;
export const update_mobile_onprofile = gql`
mutation update_mobile_onprofile{
	update_mobile_onprofile{
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