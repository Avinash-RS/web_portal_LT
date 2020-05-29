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
        user_id
        is_blocked
        is_profile_updated
        group_id                  
        message      
      }
    }
  }`;

export const get_country_details = gql`
    query get_country_details{
      get_country_details{
        message
    success
    data{
      _id
      countryname
      countryshortcode
      created_by
      created_by_ip
      updated_on
      updated_by
      updated_by_ip
      is_active

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
      coursePlayerStatus{
        status
        location
        course_id
      }
    }
  }
}`;

export const get_qualification_details = gql`
	query   get_qualification_details{
		  get_qualification_details{
	message
    success
    data{
      _id
      level_name
      level_code
      level_id
      is_active
    }
}
}
`;

export const get_board_university_details = gql`
query get_board_university_details{
  get_board_university_details{
        message
success
data{
  board{
    _id
    Board_Id
    Board_Name
    created_on
    created_by
    created_by_ip
    updated_on
    updated_by
    updated_by_ip
    is_active
  }
  university{
    _id
    University_Id
    University_Name
    created_on
    created_by
    created_by_ip
    updated_on
    updated_by
    updated_by_ip
    is_active
  }
}

  }
}`;

export const get_discipline_details = gql`
  query   get_discipline_details{
    get_discipline_details{
      message
      success
      data{
        _id
        discipline_id
        discipline_name
        discipline_code
        is_active
      }  
    }
  }
`;

export const get_specification_details = gql`
  query get_specification_details{
    get_specification_details{
      message
      success
      data{
        _id
        specification_id
        specification_name
        specification_code
        is_active
      }  
    }
  }
`;

export const get_institute_details = gql`
  query    get_institute_details{
    get_institute_details{
      message
      success
      data{
        _id
        institute_id
        institute_name
        institute_code
        is_active
      }  
    }
  }
`;

export const get_language_details = gql`
  query    get_language_details{
    get_language_details{
      message
      success
      data{
        _id
        is_active
        languagecode
        languagename
      }  
    }
  }
`;

export const get_user_detail = gql`
  query get_user_detail($email: String){
    get_user_detail(email: $email) {
      message{
        user_id
        email_verify{
          flag
        }
      }
      success
  }
}`;

export const get_user_detail_username = gql`
  query get_user_detail_username($username: String){
    get_user_detail_username(username: $username) {
      message
      success
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
query syllabus_of_particular_scorm($contentid:String,$user_id:String,$course_id:String){
  syllabus_of_particular_scorm(contentid:$contentid,user_id:$user_id,course_id:$course_id) {
    message,
    success,
    data {
      scorm_dtl_user_map{
        title
        children{
          title
          link
        }
      }
    }
  }
}`;

export const getmoduleData = gql`
query getmoduleData($courseid:String!){
  getmoduleData(courseid:$courseid) {
    success
    data {
      courseid
      _id
      url
      coursename
      coursefile
      coursestatus
      coursecreated_on
      coursedetails{
        modulename
        modulestatus
        modulecreated_on
        moduledetails{
          topicname
          topicstatus
          topiccreated_on
          topicimages
          url
          resourse{
            type
            files{
              doc_type
              path
              type_name
              size
            }
            doc_type
            count
          }
        }
      }
    }
  }
}`;
export const check_existing_user = gql`
  query check_existing_user($username: String){
    check_existing_user(username: $username) {
      message
      success
  }
}`;

export const get_all_category = gql`
query get_all_category($group_id: [String]!){
  get_all_category(group_id:$group_id){
  success
  error_msg
  message{
        _id
  category_name
  category_id
  category_description
  language_code
  created_on
  updated_on
  created_by
  creator_id
  is_active
  category_image
  }
  }
}`;

export const get_sub_category = gql`
query get_sub_category($category_id: String!){
  get_sub_category(category_id: $category_id){
  success
  message{
  _id
  sub_category_id
  sub_category_name
  sub_category_description
  language_code
  created_on
  updated_on
  created_by
  creator_id
  is_active
  sub_category_image
  parent_category_id
  is_child
  }
  error_msg
  }
}`;

export const getsupersubcategory = gql`
query  getsupersubcategory($sub_category_id: String!){
  getsupersubcategory(sub_category_id: $sub_category_id){
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
            super_sub_category_id
            super_sub_category_name
            super_sub_category_image
            super_sub_category_description
            parent_sub_category_id
            parent_category_id
      }
  }
}`;


export const get_course_by_subcategory = gql`
query get_course_by_subcategory($input_id: String!,$input_type: String!,$pagenumber: Int!){
  get_course_by_subcategory(input_id: $input_id,input_type: $input_type ,pagenumber: $pagenumber) {
  success
  error_msg
  total_count
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



// export const get_all_course_by_usergroup = gql`
//   query get_all_course_by_usergroup($group_id: String!,$pagenumber: Int!,$sort_type:String!){
//     get_all_course_by_usergroup(group_id: $group_id,pagenumber: $pagenumber,sort_type: $sort_type){
//     success
//     error_msg
//     message{
//     course_id
//     course_description
//     course_name
//     enrollment_status
//     created_at
//     updated_at
//     version
//     location
//     course_start_datetime
//     course_end_datetime
//     advertised_start
//     course_img_url
//     social_sharing_url
//     certificate_display_behaviour
//     certificates_show_before_end
//     certificate_html_view_enabled
//     has_any_active_web_certificate
//     certificate_name
//     lowest_passing_grade
//     mobile_available
//     visible_to_staff_only
//     pre_requisite{
//       name
//       image
//   }
//     enrollment_start
//     enrollment_end
//     invitation_only
//     max_student_enrollments_allowed
//     announcement
//     catalog_visibility
//     course_video_url
//     short_description
//     self_paced
//     marketing_url
//     course_language
//     certificate_available_date
//     article_count
//     downloadable_resource_count
//     course_level
//     step_towards
//     rating
//     price
//     what_will_you_learn
//     course_category
//     course_type
//     course_content_details{
//     name
//     type
//     is_active
//     parent_id
//     description
//     sub_section_id
//     file_content{
//     video_url
//     image_url
//     audio_url
//     file_url
//     }
//     unit{
//     name
//     type
//     is_active
//     parent_id
//     description
//     sub_section_id
//     file_content{
//     video_url
//     image_url
//     audio_url
//     file_url
//     }
//     }
//     }
//     author_details{
//     author_name
//     description
//     image
//     }
//     }
//     }
//     }`;
export const get_module_topic = gql`
    query get_module_topic{
      get_module_topic {
    
        data{
          _id
          modulename
        }
        success
      }
    }`;


export const getLevelCategoryData = gql`
    query getLevelCategoryData{
      getLevelCategoryData {
        success
         message
        data{
      level1{
        _id
        category_name
        category_id
        level
      }
      level2{
        _id
        sub_category_id
        sub_category_name
        parent_category_id
        level
      }
      level3{
        _id
        parent_category_id
        parent_sub_category_id
        level
        language_code
        super_sub_category_id
        super_sub_category_name
      }
    }
  }

}`;

// Guildline Search
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

export const getlearnertrack = gql`
   query get_learner_track($user_id : String!,$_id: String!) {
    get_learner_track(user_id: $user_id,_id: $_id){
        success
        error_msg
        message{
            activities_and_enroll{
                  _id
                  last_logout
                  last_login
                  courseObjects{
                         course_id
                          course_active_time
                          status
                          course_description
                          course_name
                          course_start_datetime
                          course_end_datetime
                          enrollment_start
                          enrollment_end
                          author_details{
                              author_name
                              description
                              image
                          }
                  }
            }
                  Enrolled_courses{
                          status
                          is_active
                          _id
                          user_id
                          group_id
                          course_id
                          created_at
                          updated_at
                          status_reason
                          course_description
                          course_name
                          course_start_datetime
                          course_end_datetime
                          enrollment_start
                          enrollment_end
                          author_details{
                                  author_name
                                  description
                                  image
                          }
                  }
        }
    }
}`
export const getlearnerdashboarddetails = gql`
query getlearnerdashboarddetails($user_id: String){
  getlearnerdashboarddetails(user_id:$user_id) {
    success
    message
    data{
    courseEnrolled{
    totalCount
    percent
    }
    suspend{
    _id
    totalCount
    percent
    }
    incomplete{
    _id
    totalCount
    percent
    }
    completed{
    _id
    totalCount
    percent
    }
    lastAccessedCourses{
    course_name
    course_description
    course_img_url
  }
    }
}
}`;

export const getLearnerenrolledCourses = gql`
query getLearnerenrolledCourses($user_id: String){
  getLearnerenrolledCourses(user_id:$user_id){
    success
    message
    data{
      suspend{
        _id
        totalCount
        percent
      }
      incomplete{
        _id
        totalCount
        percent
      }
      courseEnrolled{
        course_id
        course_name
        course_img_url
        rating
        price
        totalLearners
      }
    }
  }
}`;