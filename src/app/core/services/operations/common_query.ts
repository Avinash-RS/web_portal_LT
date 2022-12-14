import gql from 'graphql-tag';

export const logout = gql`
  query logout($user_id: String, $is_admin: Boolean, $is_step: Boolean){
    logout(user_id: $user_id, is_admin: $is_admin, is_step: $is_step) {
      success
      message
      error_msg
    }
  }`;


export const getAllNotifications = gql`
  query getAllNotifications($userId: String!, $userType: String, $pagenumber:Int!) {
    getAllNotifications(userId: $userId, userType: $userType, pagenumber: $pagenumber) {
    message
    unReadCount
    totalCount
    success
    data {
      _id
      userObjId
      userId
      notificationType
      notificationMessage
      created_on
      updated_on
      timeAgo
      notifiedStatus
      is_active
    }
    }
    }
    `;

export const viewcourse = gql`
  query viewcourse($course_id: String,$user_id: String){
    viewcourse(course_id: $course_id,user_id:$user_id) {
      success
      error_msg
      message{
        totalLearners
        course_enrollment_status
        course_id
        course_description
        course_long_description
        course_name
        created_at
        updated_at
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
        published_on
        user_role
        user_id
        user_name
       topicData{
          moduleData{
          moduleid
          modulename
          modulestatus
          moduledetails{
          topicname
          topicstatus
          topictime
          }
          }
          }
        people_also_viewed{
          course_id
          course_description
          course_name
          created_at
          updated_at
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
          published_on
          user_role
          user_id
          user_name
          pre_requisite{
            name
            image
          }
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
          course_content_details{
            name
            type
            is_active
            parent_id
            description
            sub_section_id
            file_content{
              video_url
              image_url
              audio_url
              file_url
            }
            unit{
              name
              type
              is_active
              parent_id
              description
              sub_section_id
              file_content{
                video_url
                image_url
                audio_url
                file_url
              }
            }
          }
          author_details{
            author_name
            description
            image
          }
        }
        frequently_bought_together{
          course_id
          course_description
          course_name
          created_at
          updated_at
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
          published_on
          user_role
          user_id
          user_name
          pre_requisite{
            name
            image
          }
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
          course_content_details{
            name
            type
            is_active
            parent_id
            description
            sub_section_id
            file_content{
              video_url
              image_url
              audio_url
              file_url
            }
            unit{
              name
              type
              is_active
              parent_id
              description
              sub_section_id
              file_content{
                video_url
                image_url
                audio_url
                file_url
              }
            }
          }
          author_details{
            author_name
            description
            image
          }
        }
        review_and_faq{
          _id
          user_id
          user_name
          course_id
          rating
          review
          created_on
          updated_on
          is_active
          faq{
            _id
            course_id
            is_active
            qa{
              question
              answer
            }
          }
        }
        pre_requisite{
          name
          image
        }
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
        course_content_details{
          name
          type
          is_active
          parent_id
          description
          sub_section_id
          file_content{
            video_url
            image_url
            audio_url
            file_url
          }
          unit{
            name
            type
            is_active
            parent_id
            description
            sub_section_id
            file_content{
              video_url
              image_url
              audio_url
              file_url
            }
          }
        }
        author_details{
          author_name
          description
          image
        }
      }
    }
  }`;

export const view_course_for_learner = gql`
  query view_course_for_learner($course_id: String!){
    view_course_for_learner(course_id: $course_id) {
      success
      error_msg
      message{
        _id
        course_name
        course_long_description
        course_mode
        course_language
        created_by
        course_id
        author_details{
          _id
          author_name
          description
          image
        }
      }
    }
  }`;

// tslint:disable-next-line: variable-name
export const view_wishlist = gql`
  query view_wishlist($user_id: String, $pagenumber: Int ){
    view_wishlist(user_id: $user_id, pagenumber: $pagenumber) {
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
        enrollment_status
        }
    }
  }`;


// tslint:disable-next-line: variable-name
export const list_content = gql`
    query list_content{
      list_content {
        success
        message
        data{
          scorm_id_mstr
          package
          package_dec
        }
      }
  }`;

// tslint:disable-next-line: variable-name
export const syllabus_of_particular_scorm = gql`
  query syllabus_of_particular_scorm($contentid: String){
    syllabus_of_particular_scorm(contentid: $contentid) {
      success
      message
      data{
        title
        children{
          title
          link
        }
      }
    }
  }`;
export const getCoursesByName = gql`
    query getCoursesByName($courseName : String!, $pagenumber : String!){
      getCoursesByName(courseName: $courseName, pagenumber: $pagenumber) {
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
           author_details{
              author_name
              description
              image
            }
           course_content_details{
              name
              type
              is_active
              parent_id
              description
              sub_section_id
              file_content{
                video_url
                image_url
                audio_url
                file_url
              }
              unit{
                  name
                  type
                  is_active
                  parent_id
                  description
                  sub_section_id
                  file_content{
                    video_url
                    image_url
                    audio_url
                    file_url
                  }
                }
            }
           article_count
           downloadable_resource_count
           course_level
           step_towards
           rating
           price
           what_will_you_learn
           course_category
           course_type
           course_mode
           learner_count
           coursepartner_details{
              name
              image
           }
           takeway_details{
              text
              description
              media{
              image
              }
              what_will_you_learn
              }
           published_by
           published_on
           updated_at
           created_at
    }
    }

      }
  `;

// tslint:disable-next-line: variable-name
export const get_all_course_by_usergroup = gql`
  query get_all_course_by_usergroup($group_id: String!,$pagenumber: Int!,$sort_type:String!){
    get_all_course_by_usergroup(group_id: $group_id,pagenumber: $pagenumber,sort_type: $sort_type){
    success
    error_msg
    total_count
    message{
    course_id
    course_description
    course_name
    enrollment_status
    created_at
    updated_at
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
    pre_requisite{
      name
      image
  }
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
    course_content_details{
    name
    type
    is_active
    parent_id
    description
    sub_section_id
    file_content{
    video_url
    image_url
    audio_url
    file_url
    }
    unit{
    name
    type
    is_active
    parent_id
    description
    sub_section_id
    file_content{
    video_url
    image_url
    audio_url
    file_url
    }
    }
    }
    author_details{
    author_name
    description
    image
    }
    }
    }
    }`;


