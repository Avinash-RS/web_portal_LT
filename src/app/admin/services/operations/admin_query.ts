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
  query search_user($search_string: String!, $pagination: Int!, $sort: Int!){
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

export const deactivate_reactivate_user = gql`
  query deactivate_reactivate_user($user_id: [String]!, $is_active: Boolean!){
    deactivate_reactivate_user(user_id: $user_id, is_active: $is_active) {
      success
      error_msg
      message {
        outdated_users
        updated_users 
      }
    }
  }`;

  export const block_user = gql`
  query block_user($user_id: [String]!, $is_blocked: Boolean!){
    block_user(user_id: $user_id, is_blocked: $is_blocked) {
      success
      error_msg
      message {
        outdated_users
        updated_users 
      }
    }
  }`;

  export const get_all_user = gql`
  query get_all_user($pagenumber: Int!, $sort: Int!){
    get_all_user(pagenumber: $pagenumber, sort: $sort) {
      success
      error_msg
      message {
        _id
        is_admin
        is_active
        user_id
        username
        is_blocked
        full_name
        email
        mobile_number
      }
    }
  }`;
  