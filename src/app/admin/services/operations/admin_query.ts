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
