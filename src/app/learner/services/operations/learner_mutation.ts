import gql from "graphql-tag";

export const user_registration = gql`
  mutation user_registration($full_name: String!, $email: String!) {
    user_registration(
      full_name: $full_name
      email: $email,
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
  mutation user_registration_mobile_otp_send($user_id: String,$user: String,$mobile_number: String!) {
    user_registration_mobile_otp_send(
      user_id:$user_id,
      user: $user,
      mobile_number: $mobile_number
    ) {
      message
      success
    }
  }
`;

export const user_registration_mobile_otp_verify = gql`
  mutation user_registration_mobile_otp_verify($mobile_number: String!,$otp:String!) {
    user_registration_mobile_otp_verify(
      mobile_number:$mobile_number,
      otp: $otp,
    ) {
      otp
      mobile_number
      _id
      message
      success
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
      _id
      success
      success_
      message_
      statusmsg
      message{
        user_id
        username
        token
        password
        created_by_ip
      }
    }
  }
`;

