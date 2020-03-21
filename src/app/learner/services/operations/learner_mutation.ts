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
export const view_profile = gql`
  mutation view_profile($user_id: String) {
    view_profile(
      user_id:$user_id
    ) {
      success
message{
full_name
email
user_id
user_mobile{
mobile_number
}
user_profile{
_id
languages_known
about_you
certificate
user_id
profile_img
year_of_birth
doj_lxp
is_active
gender
country
state
city_town
student
last_login
created_by_ip
created_by
created_on
updated_by_ip
updated_on
updated_by
}
}
    }
    }
`;

// export const update_profile = gql`
// mutation update_profile($user_id: String, $profile_img: String , $year_of_birth: String, $doj_lxp: String,){

// }
// `
export const get_state_details = gql`
    mutation get_state_details($_id: String){
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
