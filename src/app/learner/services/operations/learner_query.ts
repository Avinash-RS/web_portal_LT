import gql from "graphql-tag";

export const login = gql`
  query login($username: String, $password: String){
    login(username: $username, password: $password) {
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