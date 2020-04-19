import gql from "graphql-tag";

export const get_user_group = gql`
  query get_user_group{
    get_user_group {
        success
        message{
            _id
            group_name
            group_type
            is_active
        }
    }
  }`;

export const search_user = gql`
  query search_user($search_string: String, $pagination: Int, $sort: Int){
    search_user(search_string: $search_string, pagination: $pagination, sort: $sort) {
      success
      error_msg
      message {
        _id
        is_admin
        is_active
        user_id
        is_blocked
        email
        full_name 
        username     
      }
    }
  }`;
