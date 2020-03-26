import gql from "graphql-tag";

export const login = gql`
  query login($username: String, $password: String, $is_admin: Boolean){
    login(username: $username, password: $password, is_admin: $is_admin) {
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

  export const get_course_by_user = gql`
  query get_course_by_user($user_id: String){
    get_course_by_user(user_id: $user_id) {
      success
    error_msg
    message{
      course_id
      course_description
      course_name
      course_img_url
      certificate_name
      max_student_enrollments_allowed
      short_description
      rating,
      price

    }
  }
}`;

export const get_user_detail = gql`
  query get_user_detail($email: String){
    get_user_detail(email: $email) {
      message{
        user_id
      }
      success
  }
}`;