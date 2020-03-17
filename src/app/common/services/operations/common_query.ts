import gql from "graphql-tag";

export const logout = gql`
  query logout($user_id: String, $is_admin: Boolean){
    logout(user_id: $user_id, is_admin: $is_admin) {
      success
      message
      error_msg
    }
  }`;