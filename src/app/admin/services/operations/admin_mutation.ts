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