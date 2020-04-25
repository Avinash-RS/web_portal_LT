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

export const   get_qualification_details = gql`
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

export const get_board_university_details= gql`
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

export const   get_discipline_details = gql`
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

export const  get_specification_details = gql`
  query    get_specification_details{
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

export const  get_institute_details = gql`
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

export const  get_language_details = gql`
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

export const getModuleData = gql`
query getModuleData($courseid:String){
  getModuleData(courseid:$courseid) {
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
      path
      doc_type
      type_name
      }
      }
      }
      }
      message
      success
  }
}`;
