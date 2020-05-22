import gql from 'graphql-tag';

// tslint:disable-next-line:variable-name
export const get_user_group = gql`
  query get_user_group{
    get_user_group {
      success
      message{
          _id
          group_name
          group_type
          is_active
          group_id
      }
    }
  }`;
// tslint:disable-next-line:variable-name
export const search_user = gql`
  query search_user($search_string: String!, $pagination: Int!, $sort: Int!){
    search_user(search_string: $search_string, pagination: $pagination, sort: $sort) {
      success
      error_msg
      message {
        _id
        is_admin
        is_active
        user_id
        username
        is_blocked
        email
        full_name
        mobile_number
      }
    }
  }`;
// tslint:disable-next-line:variable-name
export const deactivate_reactivate_user = gql`
  query deactivate_reactivate_user($user_id: [String]!, $is_active: Boolean!){
    deactivate_reactivate_user(user_id: $user_id, is_active: $is_active) {
      success
      error_msg
      message {
        outdated_users
        updated_users
      }
    }
  }`;
// tslint:disable-next-line:variable-name
export const block_user = gql`
  query block_user($user_id: [String]!, $is_blocked: Boolean!){
    block_user(user_id: $user_id, is_blocked: $is_blocked) {
      success
      error_msg
      message {
        outdated_users
        updated_users
      }
    }
  }`;
// tslint:disable-next-line:variable-name
export const get_all_user = gql`
  query get_all_user($pagenumber: Int!, $sort: Int!, $group_name: String!){
    get_all_user(pagenumber: $pagenumber, sort: $sort, group_name: $group_name) {
      success
      error_msg
      learner_count
      message {
        _id
        is_admin
        is_active
        user_id
        username
        is_blocked
        full_name
        email
        mobile_number
        group_name
        group_id
      }
    }
  }`;
// tslint:disable-next-line:variable-name
export const get_user_session_detail = gql`
  query get_user_session_detail($user_id: String!){
    get_user_session_detail(user_id: $user_id) {
      success
      message{
        _id
        wishlist_count
        enrolled_course_count
        course_detail{
          course_id
          course_description
          course_name
          course_start_datetime
          course_end_datetime
          enrollment_start
          enrollment_end
          author_details
        }
        wishlist_added{
          course_id
          created_on
        }
        userObjects{
          _id
          is_admin
          is_active
          user_id
          username
          is_blocked
          is_profile_updated
          registered_date
          mobile_number
          email
          full_name
          profile_img
          year_of_birth
          progress
          gender
          about_you
          is_student_or_professional
          country_name
          state_name
          professional{
            total_experience
            organization
            job_role
          }
          social_media{
            _id
            link
            img
          }
          user_profile
        }
        player_detail{
          _id
          status
          location
          course_id
        }
        last_login
        language
      }
    }
  }`;
// tslint:disable-next-line:variable-name
export const get_all_learner_detail = gql`
  query get_all_learner_detail($user_id: String!){
    get_all_learner_detail(user_id: $user_id) {
      success
      message{
        _id
        language
        qualification{
          Board_Name
          Board_Id
          institute_id
          institute_name
          institute_code
          discipline_id
          discipline_name
          discipline_code
          year_of_passing
          percentage
          specification_id
          specification_name
          specification_code
          level_id
          level_name
          level_code
        }
        userObjects{
          _id
          is_admin
          is_active
          email
          full_name
          user_id
          username
          is_blocked
          is_profile_updated
          registered_date
          mobile_number
          profile_img
          year_of_birth
          progress
          gender
          about_you
          is_student_or_professional
          country_name
          state_name
          professional{
            total_experience
            organization
            job_role
          }
          social_media{
            _id
            link
            img
          }
          user_profile
        }
      }
      error_msg
    }
  }`;

export const getnotificationreports = gql`
  query getnotificationreports($admin_id: String!){
    getnotificationreports(admin_id: $admin_id) {
      success
      error_msg
      message{
        _id
        upload_url
        report_url
        is_active
        report_id
        admin_id
        time_ago
        success_count
        failure_count
        updated_count
        duplicate_count
        existing_count
        total_count
        notification_msg
        report_info{
          created_on
          updated_on
          created_by
        }
      }
    }
  }`;


export const getgroup = gql`
  query getgroup ($input_id: String!, $type: String!, $pagenumber: Int!){
    getgroup(input_id: $input_id, type: $type, pagenumber: $pagenumber) {
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
        hierarchy_id
        parent_group_id
      }
    }
}`;
// tslint:disable-next-line:variable-name
export const get_user_group_hierarchy = gql`
query get_user_group_hierarchy{
  get_user_group_hierarchy {
    success
    error_msg
    message{
      _id
      hierarchy_id
      hierarchy_name
      hierarchy_level
      created_on
      updated_on
      created_by
      admin_id
      is_active
    }
  }
}`;
// tslint:disable-next-line:variable-name
export const get_course_createdby_admin = gql`
query get_course_createdby_admin($admin_id: String!, $pagenumber: Int!){
  get_course_createdby_admin(admin_id: $admin_id, pagenumber: $pagenumber) {
    success
    error_msg
    course_count
    message{
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
      parent_sub_category_id
      category_id
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

// tslint:disable-next-line:variable-name
export const get_course_published = gql`
query get_course_published($admin_id: String!, $pagenumber: Int!){
  get_course_published(admin_id: $admin_id, pagenumber: $pagenumber) {
    success
    course_count
    message{
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
      parent_sub_category_id
      category_id
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
// tslint:disable-next-line:variable-name
export const get_draft_course = gql`
query get_draft_course($admin_id: String!, $pagenumber: Int!){
  get_draft_course(admin_id: $admin_id, pagenumber: $pagenumber) {
    success
    course_count
    message{
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
      parent_sub_category_id
      category_id
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
// tslint:disable-next-line:variable-name
export const publishcourse = gql`
  query publishcourse($course_id: String!, $is_published: Boolean!, $level : String!,
  $category_id : String!,
  $sub_category_id : String!,
  $super_sub_category_id : String!,){
    publishcourse(course_id: $course_id, is_published: $is_published, category_id : $category_id,
      sub_category_id : $sub_category_id, super_sub_category_id : $super_sub_category_id) {
      success
      message
      error_msg
    }
  }`;

export const getcategoryadmin = gql`
   query getcategoryadmin($pagenumber: Int!) {
    getcategoryadmin(pagenumber: $pagenumber){
      success
      error_msg
      message{
        _id
        creator_id
        level
        created_on
        updated_on
        created_by
        language_code
        is_active
        category_id
        category_name
        category_image
        category_description
        is_child
      }
    }
}`;
// tslint:disable-next-line:variable-name
export const getallcatalogue_by_id = gql`
   query getallcatalogue_by_id($catalogue_id: String!, $pagenumber: Int!) {
    getallcatalogue_by_id(catalogue_id: $catalogue_id, pagenumber : $pagenumber){
      success
      error_msg
      message{
        _id
        catalogue_name
        catalogue_description
        creator_id
        catalogue_id
        created_on
        updated_on
        created_by
        is_active
        group_details{
          _id
          admin_id
          catalogue_id
          created_on
          updated_on
          created_by
          is_active
          group_id
          group_name
          category_id
        }
        course_details{
          course_id
          course_description
          course_name
          course_category
          course_type
          course_language
          super_sub_category_details{
            _id
            creator_id
            level
            created_on
            updated_on
            created_by
            language_code
            is_active
            super_sub_category_id
            super_sub_category_name
            super_sub_category_image
            super_sub_category_description
            parent_sub_category_id
            parent_category_id
          }
          sub_category_details{
            _id
            creator_id
            level
            created_on
            updated_on
            created_by
            language_code
            is_active
            sub_category_id
            sub_category_name
            sub_category_image
            sub_category_description
            parent_category_id
          }
          category_details{
            _id
            creator_id
            level
            created_on
            updated_on
            created_by
            language_code
            is_active
            category_id
            category_name
            category_image
            category_description
          }
        }
      }
    }
}`;
// tslint:disable-next-line:variable-name
export const getallcatalogue = gql`
   query getallcatalogue($pagenumber: Int!) {
    getallcatalogue(pagenumber: $pagenumber){
      success
      error_msg
      total_count
      message{
        _id
        catalogue_name
        catalogue_description
        creator_id
        catalogue_id
        created_on
        updated_on
        created_by
        is_active
        course_count
      }
    }
}`;

export const getcoursesincatalogue = gql`
   query getcoursesincatalogue($catalogue_id: String!, $pagenumber: Int!) {
    getcoursesincatalogue(catalogue_id: $catalogue_id, pagenumber: $pagenumber){
      success
      total_count
      error_msg
      message{
        course_id
        course_name
        course_description
        short_description
        course_img_url
      }
    }
}`;

export const getcatalogue = gql`
   query getallcatalogue{
    getallcatalogue{
      success
      error_msg
      total_count
      message{
        _id
        catalogue_name
        catalogue_description
        creator_id
        catalogue_id
        created_on
        updated_on
        created_by
        is_active
      }
    }
}`;

export const getenrolledcourses = gql`
query getenrolledcourses($group_id: String!,$pagenumber: Int!,$is_individual: Boolean!,$course_id: String!){
  getenrolledcourses(group_id: $group_id,pagenumber: $pagenumber,is_individual: $is_individual,course_id: $course_id){
      success
      error_msg
      enroll_count
      message{
            _id
            user_id
            course_id
            lxp_joined_date
            username
            full_name
            group_name
            course_name
            group_id
      }
  }
}`;

// tslint:disable-next-line:variable-name
export const get_all_enrolledcourses = gql`
query get_all_enrolledcourses($pagenumber: Int!){
  get_all_enrolledcourses(pagenumber: $pagenumber){
      success
      error_msg
      message{
            totalCount
            request_date
            group_detail{
                    group_name
                    group_id
                    course_id
                    course_name
            }
      }
  }
}`;
export const getcoursesforcatalogue = gql`
   query getcoursesforcatalogue($catalogue_id: String!, $pagenumber: Int!) {
    getcoursesforcatalogue(catalogue_id: $catalogue_id, pagenumber: $pagenumber){
      success
      total_count
      error_msg
      message{
        course_id
        course_name
        course_description
        short_description
        course_img_url
      }
    }
}`;
