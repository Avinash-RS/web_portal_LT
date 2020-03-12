import gql from "graphql-tag";

export const reg = gql`
  mutation reg($password: String!, $email: String!, $is_staff: Boolean!, $is_superuser: Boolean!) {
    reg(
      password: $password
      email: $email
      remember: false
      is_staff: $is_staff,
      is_superuser: $is_superuser
    ) {
      success
      message
      csrftoken
      username
      email
      _id
      name
      is_staff,
      is_superuser
      # data {
      #   success
      #   message
      #   user_detail {
      #     username
      #     email
      #     _id
      #     name
      #     is_staff
      #   }
      # }
    }
  }
`;