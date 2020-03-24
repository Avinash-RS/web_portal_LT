import gql from "graphql-tag";

export const logout = gql`
  query logout($user_id: String, $is_admin: Boolean){
    logout(user_id: $user_id, is_admin: $is_admin) {
      success
      message
      error_msg
    }
  }`;

export const viewcourse = gql`
  query viewcourse($course_id: String){
    viewcourse(course_id: $course_id) {
      success
      error_msg
      message{
        course_id
        course_description
        course_name
        version
        location
        course_start_datetime
        course_end_datetime
        advertised_start
        course_img_url
        social_sharing_url
        certificate_display_behaviour
        certificates_show_before_end
        certificate_html_view_enabled
        has_any_active_web_certificate
        certificate_name
        lowest_passing_grade
        mobile_available
        visible_to_staff_only
        pre_requisite
        enrollment_start
        enrollment_end
        invitation_only
        max_student_enrollments_allowed
        announcement
        catalog_visibility
        course_video_url
        short_description
        self_paced
        marketing_url
        course_language
        certificate_available_date
        author_name
        author_description
        course_content_details
        article_count
        downloadable_resource_count
        course_level
        step_towards
        rating
      }
    }
  }`;

export const view_wishlist = gql`
  query view_wishlist($user_id: String){
    view_wishlist(user_id: $user_id) {
      success
      error_msg
      message{
        _id
        course_id
        created_on
        is_active
        user_id
        certificate_name
        course_description
        course_img_url
        course_name
        max_student_enrollments_allowed
        price
        rating
        short_description
        }
    }
  }`;





