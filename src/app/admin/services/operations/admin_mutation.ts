import gql from "graphql-tag";

export const user_registration = gql`
  mutation user_registration($full_name: String!, $email: String!,$term_condition:Boolean,$group_id:String,$group_name: String,$admin: [String]) {
    user_registration(
      full_name: $full_name
      email: $email,
      term_condition: $term_condition,
      group_id: $group_id,
      group_name: $group_name,
      admin: $admin
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

export const createusergroup = gql`
  mutation createusergroup($group_name: String!, $group_type: String!, $parent_group_id: String!, $hierarchy_id: String!, $admin_id: String!) {
  createusergroup(group_name: $group_name,group_type: $group_type,
  parent_group_id: $parent_group_id,hierarchy_id: $hierarchy_id,admin_id: $admin_id) {
      success
      error_msg
      message{
        _id
        group_name
        group_type
        admin_id
        created_on
        updated_on
        created_by
        is_active
        group_id
        parent_id
      }
  }
}
`;

export const update_notification = gql`
mutation update_notification($report_id: String!){
  update_notification(report_id: $report_id) {
    success
    error_msg
    message
}
}`