import gql from 'graphql-tag';


export const userRegistration = gql`
  mutation user_registration($full_name: String!, $mobile_number: String, $title_id: String,
   $email: String!,$term_condition:Boolean,$domain:String!) {
    user_registration(
      full_name: $full_name,
      mobile_number:$mobile_number,
      title_id :$title_id ,
      email: $email,
      term_condition: $term_condition,
      domain:$domain
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

// tslint:disable-next-line:variable-name
export const userRegistrationmobileOtpsend = gql`
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


export const userRegistrationmobileOtpverify = gql`
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


export const userRegistrationdone = gql`
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


export const getForgotUsernamemobileEmail = gql`
  mutation get_forgot_username_mobile_email($type: String,$subtype:String!, $mobile_number: String,$email: String ,$domain:String!) {
    get_forgot_username_mobile_email(
      type:$type,
      subtype:$subtype,
      mobile_number:$mobile_number,
      email:$email,
      domain:$domain
    ) {
      success
      message

    }
  }
`;


export const getForgotpasswordbyUsername = gql`
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



export const userRegistrationUsernamesuggestion = gql`
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


export const getForgotpasswordbyResetpassword = gql`
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

export const viewProfile = gql`
  mutation view_profile($user_id: String) {
    view_profile(user_id:$user_id)
    {
      success
      error_msg
      message {
        full_name
        email
        user_id
        country_detail {
          _id
          countryname
          countryshortcode
          created_on
          created_by
          created_by_ip
          updated_on
          updated_by
          updated_by_ip
          is_active
        }
        state_detail {
          _id
          statename
          stateshortcode
          country
          created_on
          created_by
          created_by_ip
          updated_on
          updated_by
          updated_by_ip
          is_active
        }
        district_detail {
          _id
          districtname
          created_on
          created_by
          created_by_ip
          updated_on
          updated_by
          updated_by_ip
          is_active
        }
        language_detail {
          _id
          is_active
          languagecode
          languagename
        }
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
          user_id
          profile_img
          is_active
          gender
          country
          state
          city_town
          created_by_ip
          created_by
          created_on
          updated_by_ip
          updated_on
          updated_by
          deptName
          collegeName
        }
       
      }
    }
}
`;

// export const viewProfile = gql`
//   mutation view_profile($user_id: String) {
//     view_profile(user_id:$user_id)
//     {
//       success

//       message {
//         full_name
//         email
//         user_id
//         user_dtl {
//           is_admin
//           user_id
//           username
//           password
//           created_by_ip
//           created_on
//         }
//         user_mobile {
//           mobile_number
//         }
//         user_profile {
//           _id
//           languages_known
//           is_student_or_professional
//           about_you
//           certificate

//           user_id

//           profile_img

//           year_of_birth

//           doj_lxp

//           progress

//           is_active

//           gender

//           country

//           state

//           city_town

//           student

//           professional {

//             total_experience

//             organization

//             job_role

//           }



//           social_media {

//             link

//             img

//           }

//           last_login

//           created_by_ip

//           created_by

//           created_on

//           updated_by_ip

//           updated_on

//           updated_by
//           qualification {

//             qualification

//             institute

//             board_university

//             discipline

//             specification

//             year_of_passing

//             percentage

//           }

//         }

//         country_detail {

//           _id

//           countryname

//           countryshortcode

//           is_active

//         }

//         state_detail {

//           _id

//           statename

//           stateshortcode

//           country

//           is_active

//         }

//         district_detail {

//           _id

//           districtname

//           is_active

//         }

//         qualification {

//           board {

//             _id

//             Board_Id

//             Board_Name

//             is_active

//           }

//           discipline {

//             _id

//             discipline_id

//             discipline_name

//             discipline_code

//             is_active

//           }

//           institute_detail {

//             _id

//             institute_id

//             institute_name

//             institute_code

//             is_active

//           }

//           level_detail {

//             _id

//             level_id

//             level_name

//             level_code

//             is_active

//           }

//           specification_detail {

//             _id

//             specification_id

//             specification_name

//             specification_code

//             is_active

//           }

//           university {

//             _id

//             University_Id

//             University_Name

//             is_active

//           }

//           year_of_passing

//           percentage



//         }

//         language_detail {

//           _id

//           is_active

//           languagecode

//           languagename

//         }



//         progress
//                                 }

//   }
// }
// `;


export const getStatedetails = gql`
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


export const getDistrictdetails = gql`
mutation get_district_details($country: String,$state: String){
	get_district_details(
	country: $country,
	state: $state) {
	  message
    success
    data{
       _id
      districtname
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

export const getChangePasswordupdateprofile = gql`
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


export const viewProfile1 = gql`
  mutation view_profile($user_id: String) {
    view_profile(user_id:$user_id) {
    success
    message {
      full_name
      email
      user_id
      user_mobile {
        mobile_number
      }
      user_dtl{
          username
          created_on
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
        qualification{
          discipline
          board_university
          qualification
          specification
          qualification
          year_of_passing
          percentage
        }
      }
      country_detail {
        countryname
      }
      state_detail {
        statename
      }
      district_detail {
        districtname
      }
     qualification {
        board {
          Board_Name
        }
        discipline {
          discipline_name
        }
        institute_detail {
          institute_name
        }
        level_detail {
          level_name
        }
        specification_detail {
          specification_name
        }
        university {
          University_Name
        }
      year_of_passing
      percentage
      }
      language_detail {
        languagename
      }
      progress
    }
  }
}
`;


export const deleteQualification = gql`
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

export const updateProfile = gql`
  mutation update_profile($user_id: String, $profile_img: String,
    $gender: String, $languages_known: [String],
    $country: String, $state: String, $city_town: String, $created_by_ip: String, $created_by: String, $created_on: String,
    $updated_by_ip: String, $updated_on: String, $updated_by: String,$domain:String!, $deptName:String, $collegeName : String){
    update_profile(
      user_id: $user_id,
      profile_img: $profile_img,
      gender: $gender,
      languages_known: $languages_known,
      country: $country,
      state: $state,
      city_town: $city_town,
      created_by_ip: $created_by_ip,
      created_by: $created_by,
      created_on: $created_on,
      updated_by_ip: $updated_by_ip,
      updated_on: $updated_on,
      updated_by: $updated_by,
      domain:$domain,
      deptName : $deptName,
      collegeName :$collegeName
    ) {
      success
      message

    }
  }
`;


// export const updateProfile = gql`
//   mutation update_profile($user_id: String, $is_student_or_professional: String, $profile_img: String, $year_of_birth: String, $doj_lxp: String,
//     $social_media: [social_media_content], $is_active: Boolean, $progress: String, $gender: String, $languages_known: [String],
//     $country: String, $state: String, $city_town: String, $about_you: String, $certificate: [String], $student: String,
//     $professional: professional_content, $last_login: String, $created_by_ip: String, $created_by: String, $created_on: String,
//     $updated_by_ip: String, $updated_on: String, $updated_by: String,$domain:String!){
//     update_profile(
//       user_id: $user_id,
//       profile_img: $profile_img,
//       year_of_birth: $year_of_birth,
//       doj_lxp: $doj_lxp,
//       social_media: $social_media,
//       is_active: $is_active,
//       progress: $progress,
//       gender: $gender,
//       languages_known: $languages_known,
//       country: $country,
//       state: $state,
//       city_town: $city_town,
//       about_you: $about_you,
//       certificate: $certificate,
//       is_student_or_professional: $is_student_or_professional,
//       student: $student,
//       professional: $professional,
//       last_login: $last_login,
//       created_by_ip: $created_by_ip,
//       created_by: $created_by,
//       created_on: $created_on,
//       updated_by_ip: $updated_by_ip,
//       updated_on: $updated_on,
//       updated_by: $updated_by,
//       domain:$domain
//     ) {
//       success
//       message

//     }
//   }
// `;
export const updateMobileonprofile = gql`
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

export const updateVerifyotpmobileonProfile = gql`
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

export const updateEmailonprofile = gql`
  mutation update_email_onprofile($user_id: String, $email: String,$domain:String!){
    update_email_onprofile(
      user_id: $user_id,
      email: $email,
      domain:$domain
    ) {
      message
      success
    }
  }
`;

export const resendOtponprofile = gql`
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
        isSelected
        category_id
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
    $pagenumber:Int!,$perPage: Int!, $publishedToDate: String, $publishedFromDate: String,
    $catalogue_visibility: Int ) {
    getCourseCategorySearch(category:$category,sub_category:$sub_category,super_sub_category:$super_sub_category,
      course_language:$course_language,course_mode:$course_mode,author_details:$author_details,partner_details:$partner_details,
      pagenumber:$pagenumber,perPage:$perPage, publishedToDate:$publishedToDate,
       publishedFromDate:$publishedFromDate, catalogue_visibility: $catalogue_visibility
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

export const createGuidanceRequest = gql`
  mutation create_guidance_request($name: String!,$email_id:String!, $created_by_ip : String!, $course_id : String!) {
    create_guidance_request(
      name:$name,
      email_id:$email_id,
      created_by_ip:$created_by_ip,
      course_id:$course_id,
    ) {
      message
      success
      error_msg
    }
  }
`;
export const InsertCourseFeedback = gql`
mutation InsertCourseFeedback($user_id: String!, $question_id: [que_dtl], $question_ans: [question_ans_content],$course_id: String ){
    InsertCourseFeedback(user_id: $user_id, question_id: $question_id, question_ans: $question_ans, course_id : $course_id ) {
      success
      message
    }
  }`;

export const playerstatusrealtime = gql`
mutation playerstatusrealtime($user_id: String, $contentID:String,$module:[module_type_input],$percentage:String){
  playerstatusrealtime(user_id: $user_id,contentID:$contentID,module:$module,percentage:$percentage) {
      success
      message
    }
  }`;

export const CreateNewThread = gql`
mutation CreateNewThread($uid: String!, $course_id: String!, $module_name:String!, $title:String!, $content:String!, $course_name: String!,
$batch_id: String, $batch_name: String){
  CreateNewThread(uid: $uid, course_id : $course_id, module_name:$module_name,title:$title,content:$content, course_name:$course_name,
    batch_id: $batch_id, batch_name:$batch_name ) {
    success
    message
  }
}`;

export const CreateNewThreadBid = gql`
mutation CreateNewThread($uid: String!, $course_id: String!, $module_name:String!, $title:String!, $content:String!, $course_name: String!,
$batch_id: String, $batch_name: String){
  CreateNewThread(uid: $uid, course_id : $course_id, module_name:$module_name,title:$title,content:$content, course_name:$course_name,
    batch_id: $batch_id, batch_name:$batch_name ) {
    success
    message
  }
}`;
export const claimcourse = gql`
  mutation claimcourse($id: String, $user_id: String, $course_id: [String], $courseName: String, $categoryName: String) {
    claimcourse(id: $id, user_id: $user_id, course_id: $course_id, courseName: $courseName, categoryName:$categoryName) {
      message
      success
    }
  }
`;


export const  userMstrdata = gql`
  mutation  user_mstr_data {
    user_mstr_data {
      success
        data {
          _id
          title
        }
    }
  }
`;




export const addTopicreference = gql`
mutation add_topic_reference($user_id: String!, $batch_id: String, $course_id:String!, $module_id:String!, $topic_id:String!,
$reference_id: String,$ reference_status: Boolean, $created_by: String){
  add_topic_reference(user_id: $user_id, batch_id : $batch_id, course_id:$course_id,module_id:$module_id,topic_id:$topic_id, reference_id:$reference_id,
    reference_status: $reference_status, created_by:$created_by ) {
      success
      error_msg
      message{
          is_active
          _id
          user_id
          batch_id
          course_id
          module_id
          topic_id
          reference_id
          reference_status
          created_by
          created_on
          updated_by
          updated_on
      }
  }
}`;


export const  saveAttendies = gql`
  mutation  save_attendies(
    $userid:String,
    $activityid:String,
    $activitynamne:String,
    $username:String,
    $mobile:String,
    $email:String,
    $status:String
    ) {
      save_attendies(userid:$userid,
        activityid:$activityid,
        activitynamne:$activitynamne,
        username: $username,
        mobile:$mobile,
        email: $email,
        status:$status){
          success
          message
        }
  }
`;

export const bulkclaimcourse = gql`
  mutation bulkclaimcourse($id: String, $user_id: String, $category_id: String, $categoryName: String) {
    bulkclaimcourse(id: $id, user_id: $user_id, category_id: $category_id, categoryName: $categoryName) {
      message
      success
    }
  }
`;

export const markAsRead = gql`
  mutation markAsRead($notifications:[String], $userId: String) {
    markAsRead(notifications : $notifications, userId : $userId) {
      message
      success
    }
  }
`;
export const user_experience = gql`
  mutation userexperience($user_id:String!,$course_id:String,$module:String,$topic:String,$userexperience:String!,$status:String) {
    userexperience(user_id:$user_id,course_id:$course_id,module:$module,topic:$topic,userexperience:$userexperience,status:$status) {
      message
      success
    }
  }
`;
export const set_bookmark = gql`
  mutation bookmark($user_id:String!,$course_id:String,$module:String,$topic:String,$bookmark:Boolean) {
    bookmark(user_id:$user_id,course_id:$course_id,module:$module,topic:$topic,bookmark:$bookmark) {
      message
      success
    }
  }
`;
export const set_askaquestion = gql`
  mutation askaquestion($user_id:String!,$course_id:String,$module:String,$topic:String,$question:String) {
    askaquestion(user_id:$user_id,course_id:$course_id,module:$module,topic:$topic,question:$question) {
      message
      success
    }
  }
`;
export const   getMyQuestion = gql`
mutation getmyque($user_id:String,$course_id:String,$module:String,$topic:String,){
  getmyque(user_id:$user_id,course_id:$course_id,module:$module,topic:$topic){
success
message{
  filteredValue
  {
    question{
      que_id
      que
      ans
      askDate
      ansDate
      askTime
      ansTime
    }
  }
}
}
}
`;

export const get_allquestion = gql`
mutation getallquestion($user_id:String,$course_id:String,$module:String,$topic:String,$sort:Int,$batchid:String){
  getallquestion(user_id:$user_id,course_id:$course_id,module:$module,topic:$topic,sort:$sort,batchid:$batchid){
success
message{
  user_id
  filteredValue
  {
    question{
      que_id
      que
      ans
      askDate
      ansDate
      askTime
      ansTime
    }
  }
}
}
}
`;
export const getQAsortsearch = gql`
mutation sortsearch($batchid:String,$course_id:String,$sort:Int,$pagenumber:Int,$type:Boolean,$module:String,$topic:String,$screenType:String){
  sortsearch(batchid:$batchid,course_id:$course_id,sort:$sort,pagenumber:$pagenumber,type:$type,module:$module,topic:$topic,screenType:$screenType){
success
status
message{
  user_name
    question{
      que_id
      que
      ans
      askDate
      ansDate
      askTime
      ansTime
    }
}
}
}
`;

export const getActivityCalendar = gql`
mutation getActivityCalendar($courseId:String,$status:String,$dateType:String!,$activityType:String,$date:String!,$userId:String!){
  getActivityCalendar(courseId:$courseId,status:$status,dateType:$dateType,activityType:$activityType,date:$date,userId:$userId){
success
message
data{
  pendingActivityCount
  completedActivityCount
  allActivityCount
  activities{
    _id
    activitytype
    activityname
    activitystartdate
    activityenddate
    courseid
    coursename
    modulename
    topicname
    status
    link
    self_paced_learning
    liveclassroom
  }
}
}
}
`;
export const getengineersForumData = gql`
mutation getengineersForumData($userId:String!,$courseId:String!,$requestType:String!,$pagenumber:Int!){
  getengineersForumData(userId:$userId,courseId:$courseId,requestType:$requestType,pagenumber:$pagenumber){
success
message
error_msg
data {
  answered
  status
  questionId
  question
  askedDate
  askedBy
  answer
  publishedDate
  userId
}
totalcount
}
}
`;
export const createEngineersForumData = gql`
mutation createEngineersForumData($userId:String!,$userName:String!,$courseId:String!,$question:String!,$courseName:String!){
  createEngineersForumData(userId:$userId,userName:$userName,courseId:$courseId,question:$question,courseName:$courseName){
    success
     message
     error_msg
}
}
`;
