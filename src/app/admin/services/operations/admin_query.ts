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
      learner_count
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

  export const get_all_learner_detail = gql`
  query get_all_learner_detail($user_id: String!){
    get_all_learner_detail(user_id: $user_id) {
      success
      message{
        _id
        language
        qualification{
          Board_Name
          Board_Id
          institute_id
          institute_name
          institute_code
          discipline_id
          discipline_name
          discipline_code
          year_of_passing
          percentage
          specification_id
          specification_name
          specification_code
          level_id
          level_name
          level_code
        }
        userObjects{
          _id
          is_admin
          is_active
          email
          full_name
          user_id
          username
          is_blocked
          is_profile_updated
          registered_date
          mobile_number
          profile_img
          year_of_birth
          progress
          gender
          about_you
          is_student_or_professional
          country_name
          state_name
          professional{
            total_experience
            organization
            job_role
          }
          social_media{
            _id
            link
            img
          }
          user_profile
        }
      }
      error_msg
    }
  }`;

  