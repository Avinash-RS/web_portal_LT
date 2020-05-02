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
    data {
      courseid
      _id
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
          resourse{
            type
            files{
              doc_type
              path
            }
            doc_type
            type_name
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
query get_sub_category($category_id: Int!){
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
  }
  error_msg
  }
}`;


export const get_course_by_subcategory = gql`
query get_course_by_subcategory($input_id: String!,$input_type: String!,$pagenumber: Int!){
  get_course_by_subcategory(input_id: $input_id,input_type: $input_type ,pagenumber: $pagenumber) {
  success
  error_msg
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
  }
  }
  }
  }`;



export const get_all_course_by_usergroup = gql`
  query($group_id: String!,$pagenumber: Int!){
    get_all_course_by_usergroup(group_id: $group_id,pagenumber: $pagenumber){
    success
    error_msg
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
    }
    }
    }
    }`;
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