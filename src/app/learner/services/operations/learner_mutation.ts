import gql from "graphql-tag";

export const user_registration = gql`
  mutation user_registration($full_name: String!, $email: String!,$term_condition:Boolean) {
    user_registration(
      full_name: $full_name
      email: $email,
      term_condition: $term_condition
    ) {
      message
      success
      data {
      user_id
      full_name
      email
      _id
      }
      _id
      error
    }
  }
`;

export const user_registration_mobile_otp_send = gql`
  mutation user_registration_mobile_otp_send($user_id: String,$user: String,$mobile_number: String!,$email: String) {
    user_registration_mobile_otp_send(
      user_id:$user_id,
      user: $user,
      mobile_number: $mobile_number,
      email: $email,
      is_active: true
    ) {
      message
      success
    }
  }
`;

export const user_registration_mobile_otp_verify = gql`
  mutation user_registration_mobile_otp_verify($otp:String!,$mobile_number: String!) {
    user_registration_mobile_otp_verify(
      otp: $otp,
      mobile_number:$mobile_number
      
    ) {
      message
      success
      data{
        otp
        _id
        mobile_number
        user_id
        username
      }
    }
  }
`;

export const user_registration_done = gql`
  mutation user_registration_done($user_id: String,$username: String,$password:String!, $created_by_ip: String!) {
    user_registration_done(
      user_id:$user_id,
      username:$username,
      password:$password,
      created_by_ip:$created_by_ip
    ) {
      success
      _id
      message
      token
    }
  }
`;

export const get_forgot_username_mobile_email = gql`
  mutation get_forgot_username_mobile_email($type: String,$subtype:String!, $mobile_number: String,$email: String) {
    get_forgot_username_mobile_email(
      type:$type,
      subtype:$subtype,
      mobile_number:$mobile_number,
      email:$email
    ) {
      success
      message
      
    }
  }
`;

export const get_forgot_password_byusername = gql`
  mutation get_forgot_password_byusername($username: String) {
    get_forgot_password_byusername(
      username:$username,
    ) {
      message
      success
      user_id
      data{
        value
        type
      }
     
    }
  }
`;


export const user_registration_username_suggestion = gql`
  mutation user_registration_username_suggestion($user_id: String) {
    user_registration_username_suggestion(
      user_id:$user_id,
    ) {
      message
      success
      data
        
    }
  }
`;

export const get_forgot_password_byresetpassword = gql`
  mutation get_forgot_password_byresetpassword($username: String!,$password:String!) {
    get_forgot_password_byresetpassword(
      username:$username,
      password:$password
    ) {
      message
      success
    }
  }
`;
export const view_profile = gql`
  mutation view_profile($user_id: String) {
    view_profile(user_id:$user_id) 
    {
      success

      message {
  
        full_name
  
       
  
        email
  
        user_id
  
        user_dtl {
  
          is_admin
  
          user_id
  
          username
  
          password
  
          created_by_ip
          created_on
  
        }
  
        user_mobile {
  
          mobile_number
  
        }
  
        user_profile {
  
          _id
  
          languages_known
  
          is_student_or_professional
  
          about_you
  
          certificate
  
          user_id
  
          profile_img
  
          year_of_birth
  
          doj_lxp
  
          progress
  
          is_active
  
          gender
  
          country
  
          state
  
          city_town
  
          student
  
          professional {
  
            total_experience
  
            organization
  
            job_role
  
          }
  
         
  
          social_media {
  
            link
  
            img
  
          }
  
          last_login
  
          created_by_ip
  
          created_by
  
          created_on
  
          updated_by_ip
  
          updated_on
  
          updated_by
          qualification {   

            qualification
  
            institute
  
            board_university
  
            discipline
  
            specification
  
            year_of_passing
  
            percentage
  
          }                 
  
        }
  
        country_detail {
  
          _id
  
          countryname
  
          countryshortcode
  
          is_active
  
        }
  
        state_detail {
  
          _id
  
          statename
  
          stateshortcode
  
          country
  
          is_active
  
        }
  
        district_detail {
  
          _id
  
          districtname
  
          country
  
          state
  
          is_active
  
        }
  
        qualification {
  
          board {
  
            _id
  
            Board_Id
  
            Board_Name
  
            is_active
  
          }
  
          discipline {
  
            _id
  
            discipline_id
  
            discipline_name
  
            discipline_code
  
            is_active
  
          }
  
          institute_detail {
  
            _id
  
            institute_id
  
            institute_name
  
            institute_code
  
            is_active
  
          }
  
          level_detail {
  
            _id
  
            level_id
  
            level_name
  
            level_code
  
            is_active
  
          }
  
          specification_detail {
  
            _id
  
            specification_id
  
            specification_name
  
            specification_code
  
            is_active
  
          }
  
          university {
  
            _id
  
            University_Id
  
            University_Name
  
            is_active
  
          }
  
          year_of_passing
  
          percentage
  
         
  
        }
  
        language_detail {
  
          _id
  
          is_active
  
          languagecode
  
          languagename
  
        }
  
       
  
        progress
                                }

  }
}
`;

export const get_state_details = gql`
    mutation   get_state_details($_id: String){
      get_state_details(
        _id: $_id
      ) {
        message
    success
    data{
      _id
      statename
      stateshortcode
      country
      created_by
      created_on
      created_by_ip
      updated_on
      updated_by
      updated_by_ip
      is_active
    }
      }
    }
    `;

export const get_district_details = gql`
mutation get_district_details($country: String,$state: String){
	get_district_details(
	country: $country,
	state: $state) {
	  message
    success
    data{
       _id
      districtname
      state
      country
      created_by
      created_on
      created_by_ip
      updated_on
      updated_by
      updated_by_ip
      is_active
    }
} 
}
`;
export const get_change_password_updateprofile = gql`
mutation get_change_password_updateprofile($username: String, $old_password: String $password: String){
  get_change_password_updateprofile(
    username: $username,
    old_password: $old_password,
    password: $password
  ) {
    message
success
  }
}
`;

export const delete_qualification = gql`
 mutation delete_qualification($user_id: String,$qualification: String){
  delete_qualification(
    user_id: $user_id,
    qualification: $qualification
    ) {
      success
      message
    }
  }
`;


export const update_profile = gql`
  mutation update_profile($user_id: String, $is_student_or_professional: String, $profile_img: String, $year_of_birth: String, $doj_lxp: String,$qualification: [qualification_content],
    $social_media: [social_media_content], $is_active: Boolean, $progress: String, $gender: String, $languages_known: [String],
    $country: String, $state: String, $city_town: String, $about_you: String, $certificate: [String], $student: String,
    $professional: professional_content, $last_login: String, $created_by_ip: String, $created_by: String, $created_on: String,
    $updated_by_ip: String, $updated_on: String, $updated_by: String){
    update_profile(
      user_id: $user_id,
      profile_img: $profile_img,
      year_of_birth: $year_of_birth,
      doj_lxp: $doj_lxp,
      qualification: $qualification,
      social_media: $social_media,
      is_active: $is_active,
      progress: $progress,
      gender: $gender,
      languages_known: $languages_known,
      country: $country,
      state: $state,
      city_town: $city_town,
      about_you: $about_you,
      certificate: $certificate,
      is_student_or_professional: $is_student_or_professional,
      student: $student,
      professional: $professional,
      last_login: $last_login,
      created_by_ip: $created_by_ip,
      created_by: $created_by,
      created_on: $created_on,
      updated_by_ip: $updated_by_ip,
      updated_on: $updated_on,
      updated_by: $updated_by
    ) {
      success
      message

    }
  }
`;
export const update_mobile_onprofile = gql`
mutation update_mobile_onprofile($user_id: String, $mobile_number: String){
	update_mobile_onprofile(
    user_id: $user_id,
    mobile_number: $mobile_number,
    ) {
	    message
    success
}
}
`;
export const update_verifyotp_mobile_onprofile = gql`
  mutation  update_verifyotp_mobile_onprofile($user_id: String, $mobile_number: String, $otp: String){
    update_verifyotp_mobile_onprofile(
      user_id: $user_id,
      mobile_number: $mobile_number,
      otp: $otp
    ) {
      success
      message
    }
  }
`;
export const update_email_onprofile = gql`
  mutation update_email_onprofile($user_id: String, $email: String){
    update_email_onprofile(
      user_id: $user_id,
      email: $email
    ) {
      message
      success
    }
  }
`;
export const resend_otp_onprofile = gql`
  mutation resend_otp_onprofile($user_id: String) {
    resend_otp_onprofile(
      user_id:$user_id
    ) {
      message
      success
    }
  }
`;

export const gettopicdetail = gql`
  mutation gettopicdetail($_id: String,$module_name:String) {
    gettopicdetail(
      _id:$_id,module_name:$module_name
    ) {
      data{
        topicname
      }
      success
    }
    
  }
`;


export const getLevelSubCategoryData = gql`
  mutation getLevelSubCategoryData($level1: [String],$level2:[String],$level3:[String]) {
    getLevelSubCategoryData(level1:$level1,level2:$level2,level3:$level3) {
      success
      message,
    data{
      level1{
        _id
        category_id
        isSelected
        category_name
        category_description
        level   
      }
      level2{
       _id
        sub_category_id
        isSelected
        sub_category_name
        parent_category_id
        level
      }
      level3{
        _id
        parent_category_id
        parent_sub_category_id
        isSelected
        creator_id
        level
        super_sub_category_id
        super_sub_category_name
      }
    }
    
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
        count{
          total_count
        }
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
  }
  }
`;