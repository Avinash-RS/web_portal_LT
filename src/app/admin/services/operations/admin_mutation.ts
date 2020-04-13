import gql from "graphql-tag";

export const map_user_group = gql`
  mutation map_user_group($admin: String, $user_id: String, $group_name: String, $group_id: String) {
    map_user_group(
      user_id:$user_id,
      admin:$admin,
      group_name:$group_name,
      group_id:$group_id
    ) {
      message
      success
      error_msg
    }
  }
`;