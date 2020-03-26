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
  rating
    }
  }
}`;


export const list_content = gql`
query list_content{
  list_content {
    message,
    success,
    data
  }
}
`;

export const syllabus_of_particular_scorm = gql`
query syllabus_of_particular_scorm($contentid:String){
  syllabus_of_particular_scorm(contentid:$contentid) {
    message,
    success,
    data{
      title,
      children{
      title,
        link
    }
    }
  }
}`;

