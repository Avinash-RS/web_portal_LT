import gql from "graphql-tag";

export const login = gql`
  query login($username: String, $password: String, $is_admin: Boolean){
    login(username: $username, password: $password, is_admin: $is_admin) {
      success
      error_msg
      message {
        _id
        email
        is_active
        username
        token
      }
    }
  }`;

  export const get_country_details = gql`
    query get_country_details{
      get_country_details{
        message
    success
    data{
      _id
      countryname
      countryshortcode
      created_by
      created_by_ip
      updated_on
      updated_by
      updated_by_ip
      is_active

    }
      }
    }`;
