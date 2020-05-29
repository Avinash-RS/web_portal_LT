import gql from "graphql-tag";

export const add_to_wishlist = gql`
mutation add_to_wishlist($user_id: String, $course_id: String){
    add_to_wishlist(user_id: $user_id, course_id: $course_id) {
      success
      message
      error_msg,
      wishlist_id
    }
  }`;

export const delete_wishlist = gql`
  mutation delete_wishlist($wishlist_id: String){
    delete_wishlist(wishlist_id: $wishlist_id) {
      success
      message
      error_msg
    }
}`;


export const getPlayerStatus = gql`
  mutation getPlayerStatus($user_id: String){
    getPlayerStatus(user_id: $user_id) {
      message{
        course_dtl{
          location
          status
        }
      }
      success
    }
}`;
export const geturl = gql`
mutation geturl($courseid: String!) {
    geturl(courseid: $courseid) {
      message
      success
    }
  }
`;
export const enrollcourse = gql`
mutation enrollcourse($user_id: String!, $group_id:String!, $course_id: String!) {
    enrollcourse( user_id:$user_id, group_id:$group_id,course_id: $course_id) {
      message
      success
      error_msg
    }
  }
`;
export const getCourseCategorySearch = gql`
  mutation getCourseCategorySearch($category: [String]!,$sub_category:[String]!, $super_sub_category: [String]!,
    $course_language: [String],  $course_mode:[String],$author_details:[String],$partner_details:[String],
    $pagenumber:Int!,$perPage: Int!, $publishedToDate: String, $publishedFromDate: String ) {
    getCourseCategorySearch(category:$category,sub_category:$sub_category,super_sub_category:$super_sub_category,
      course_language:$course_language,course_mode:$course_mode,author_details:$author_details,partner_details:$partner_details,
      pagenumber:$pagenumber,perPage:$perPage, publishedToDate:$publishedToDate,
       publishedFromDate:$publishedFromDate
      ) {
        success
        message    
        data{
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
          article_count
          downloadable_resource_count
          course_level
          step_towards
          rating
          price
          what_will_you_learn
          course_category
          course_type
          groupid
          created_by
          updated_by
          admin_id
          is_published
          course_mode
          preview_video
          learner_count
          is_active
          published_by
          publisher_id
          updated_by_id
          user_role
          user_id
          user_name
          published_on
          updated_at
          created_at
          super_sub_category_id
          pre_requisite
          takeway_details{
            text
            description
            what_will_you_learn
            media
          }
          coursepartner_details{
             name
             image
          }
          category_id
          parent_sub_category_id
          course_content_details
          author_details{
            author_name
            description
            image
          }
        }
        languageCount{
        course_language
        count
        }
        instructor{
        authordetails
        count
        }
        partner{
        coursepartnerdetails
        count
        }
        courseMode{
        course_mode
        count
        }    
  }
  }
`;
export const getDetailsCount = gql`
    query getDetailsCount{
      getDetailsCount {
        success
         error_msg
        message{
          course_data{
            course_language
            count
          }
      author_data{
        authordetails
        count
      }
      coursepartner_data{
        coursepartnerdetails
        count
      }
      coursemode_data{
        course_mode
        count
      }
      other_data{
        fieldCount
        affectedRows
        insertId
        serverStatus
        warningCount
        message
        protocol41
        changedRows
      }
    }
      }
  }`;
