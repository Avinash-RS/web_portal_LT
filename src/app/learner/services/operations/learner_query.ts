import gql from 'graphql-tag';

export const login = gql`
  query login($username: String, $password: String, $is_admin: Boolean) {
    login(username: $username, password: $password, is_admin: $is_admin) {
      success
      error_msg
      message {
        _id
        full_name
        profile_img
        email
        is_active
        username
        token
        user_id
        is_blocked
        is_forum_config
        is_thread_config
        is_comment_config
        is_profile_updated
        group_id
        message
        bb_forum
        nodebb_response {
          uid
        }
      }
    }
  }
`;

export const getLoginUserDetail = gql`
  query get_login_details($username: String!) {
    get_login_details(username: $username) {
      success
      error_msg
      message {
        is_admin
        is_active
        is_blocked
        is_profile_updated
        _id
        user_id
        username
        token
        full_name
        is_forum_config
        is_comment_config
        is_thread_config
        message
        profile_img
        group_id
        nodebb_response{
            uid
        }
      }
    }
  }
`;


export const getCountrydetails = gql`
  query get_country_details {
    get_country_details {
      message
      success
      data {
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
  }
`;

export const getCoursebyUser = gql`
  query get_course_by_user($user_id: String) {
    get_course_by_user(user_id: $user_id) {
      success
      error_msg
      message {
        feed_back
        course_id
        course_description
        course_name
        course_img_url
        certificate_name
        max_student_enrollments_allowed
        short_description
        rating
        price
        coursePlayerStatus {
          status
          location
          course_id
        }
      }
    }
  }
`;


export const getQualificationdetails = gql`
  query get_qualification_details {
    get_qualification_details {
      message
      success
      data {
        _id
        level_name
        level_code
        level_id
        is_active
      }
    }
  }
`;


export const getBoardUniversitydetails = gql`
  query get_board_university_details($_id: String!) {
    get_board_university_details(_id: $_id) {
      message
      success
      data {
        board {
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
        university {
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
  }
`;

export const getDisciplinedetails = gql`
  query get_discipline_details($_id: String!) {
    get_discipline_details(_id: $_id) {
      message
      success
      data {
        _id
        discipline_id
        discipline_name
        discipline_code
        is_active
      }
    }
  }
`;


export const getSpecificationdetails = gql`
  query get_specification_details {
    get_specification_details {
      message
      success
      data {
        _id
        specification_id
        specification_name
        specification_code
        is_active
      }
    }
  }
`;


export const getInstitutedetails = gql`
  query get_institute_details {
    get_institute_details {
      message
      success
      data {
        _id
        institute_id
        institute_name
        institute_code
        is_active
      }
    }
  }
`;


export const getLanguagedetails = gql`
  query get_language_details {
    get_language_details {
      message
      success
      data {
        _id
        is_active
        languagecode
        languagename
      }
    }
  }
`;


export const getUserdetail = gql`
  query get_user_detail($email: String) {
    get_user_detail(email: $email) {
      message {
        user_id
        email
        full_name
        email_verify {
          flag
        }
      }
      success
    }
  }
`;


export const getUserdetailUsername = gql`
  query get_user_detail_username($username: String) {
    get_user_detail_username(username: $username) {
      message
      success
    }
  }
`;


export const listContent = gql`
  query list_content {
    list_content {
      message
      success
      data
    }
  }
`;


export const syllabusofParticularScorm = gql`
  query syllabus_of_particular_scorm(
    $contentid: String
    $user_id: String
    $course_id: String
  ) {
    syllabus_of_particular_scorm(
      contentid: $contentid
      user_id: $user_id
      course_id: $course_id
    ) {
      message
      success
      data {
        scorm_dtl_user_map {
          title
          children {
            title
            link
          }
        }
      }
    }
  }
`;

export const getmoduleData = gql`
  query getmoduleData($courseid: String!, $user_id: String) {
    getmoduleData(courseid: $courseid, user_id: $user_id) {
      success
      data {
        playerstatusData {
          success
          playerstatus {
            course_dtl {
              module {
                topic {
                  topic_name
                  status
                }
                module_name
              }
            }
          }
        }
        courseid
        _id
        url
        page
        totalResourseCount
        coursename
        coursefile
        coursestatus
        coursetime
        coursecreated_on
        coursedetails {
          modulename
          modulestatus
          modulecreated_on
          moduledetails {
            topicname
            topicstatus
            topiccreated_on
            topicimages
            url
            resourse {
              _id
              type
              files {
                doc_status
                _id
                assignment
                doc_type
                path
                type_name
                size
                fileType
              }
              doc_type
              count
            }
          }
        }
      }
    }
  }
`;

export const checkExistingUser = gql`
  query check_existing_user($username: String) {
    check_existing_user(username: $username) {
      message
      success
    }
  }
`;


export const getAllCategory = gql`
  query get_all_category($group_id: [String]!) {
    get_all_category(group_id: $group_id) {
      success
      error_msg
      message {
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
  }
`;


export const getSubCategory = gql`
  query get_sub_category($category_id: String!) {
    get_sub_category(category_id: $category_id) {
      success
      message {
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
  }
`;

export const getsupersubcategory = gql`
  query getsupersubcategory($sub_category_id: String!) {
    getsupersubcategory(sub_category_id: $sub_category_id) {
      success
      error_msg
      message {
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
  }
`;


export const getCoursebySubcategory = gql`
  query get_course_by_subcategory(
    $input_id: String!
    $input_type: String!
    $pagenumber: Int!
  ) {
    get_course_by_subcategory(
      input_id: $input_id
      input_type: $input_type
      pagenumber: $pagenumber
    ) {
      success
      error_msg
      total_count
      message {
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
        pre_requisite {
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
        course_content_details {
          name
          type
          is_active
          parent_id
          description
          sub_section_id
          file_content {
            video_url
            image_url
            audio_url
            file_url
          }
          unit {
            name
            type
            is_active
            parent_id
            description
            sub_section_id
            file_content {
              video_url
              image_url
              audio_url
              file_url
            }
          }
        }
        author_details {
          author_name
          description
          image
        }
      }
    }
  }
`;

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

export const getModuletopic = gql`
  query get_module_topic($course_id: String) {
    get_module_topic(course_id: $course_id) {
      data {
        _id
        modulename
      }
      success
    }
  }
`;

export const getLevelCategoryData = gql`
  query getLevelCategoryData {
    getLevelCategoryData {
      success
      message
      data {
        level1 {
          _id
          category_name
          category_id
          level
        }
        level2 {
          _id
          sub_category_id
          sub_category_name
          parent_category_id
          level
        }
        level3 {
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
  }
`;

// Guildline Search
export const getDetailsCount = gql`
  query getDetailsCount {
    getDetailsCount {
      success
      error_msg
      message {
        course_data {
          course_language
          count
        }
        author_data {
          authordetails
          count
        }
        coursepartner_data {
          coursepartnerdetails
          count
        }
        coursemode_data {
          course_mode
          count
        }
        other_data {
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
  }
`;

export const getlearnertrack = gql`
  query get_learner_track($user_id: String!, $_id: String!) {
    get_learner_track(user_id: $user_id, _id: $_id) {
      success
      error_msg
      message {
        activities_and_enroll {
          _id
          last_logout
          last_login
          courseObjects {
            course_id
            course_active_time
            status
            course_description
            course_name
            course_start_datetime
            course_end_datetime
            enrollment_start
            enrollment_end
            author_details {
              author_name
              description
              image
            }
          }
        }
        Enrolled_courses {
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
          author_details {
            author_name
            description
            image
          }
        }
      }
    }
  }
`;
export const getlearnerdashboard = gql`
  query get_learner_dashboard($user_id: String!, $user_obj_id:String!,$pagenumber:String!,$request_type:String!,$course_type:String!) {
    get_learner_dashboard(user_id: $user_id, user_obj_id:$user_obj_id, pagenumber:$pagenumber, request_type:$request_type, course_type:$course_type) {
success
error_msg
message{
    ongoing_count
    completed_count
    all_count
    batch_course_details{
        _id
        course_name
        course_description
        course_long_description
        course_img_url
        preview_video
        certificate_name
        course_mode
        course_type
        course_language
        course_status
        feed_back
        drm
        user_role
        user_id
        user_name
        version
        location
        course_start_datetime
        course_end_datetime
        advertised_start
        course_video_url
        social_sharing_url
        certificate_display_behaviour
        certificates_show_before_end
        certificate_html_view_enabled
        has_any_active_web_certificate
        lowest_passing_grade
        mobile_available
        visible_to_staff_only
        enrollment_start
        enrollment_end
        invitation_only
        max_student_enrollments_allowed
        announcement
        catalog_visibility
        short_description
        self_paced
        marketing_url
        certificate_available_date
        article_count
        downloadable_resource_count
        course_level
        step_towards
        rating
        price
        course_category
        created_by
        updated_by
        admin_id
        is_published
        learner_count
        is_active
        published_by
        publisher_id
        updated_by_id
        course_id
        created_at
        updated_at
        published_on
        published_on_date
        assignment_submitted_count
        assignment_total_count
        completed_mid_course_project_count
        total_mid_course_project_count
        total_module_count
        total_topic_count
        week_total_count
        week_completed_count
        image_self_paced_learning_time
        total_duration
        instructor_lead_session_completed_count
        instructor_lead_session_total_count
        self_paced_learning_progression
        completed_module_count
        completed_topic_count
        batch_start_date
        batch_end_date
        batch_name
        batch_description
        thread_count
        comment_count
        reply_count
        image_instructor_lead_session_time
        image_internal_assesment
        image_mid_course_project
        image_final_assesment
        internal_assesment
        final_assesment
        credits
        batch_instructor_details{
                id
                name
                image
                description
                role
                roleid
                userid
                role_type_id
                role_type_name
        }
        activity_info{
            _id
            batchid
            courseid
            coursename
            modulecount
            thread_count
            comment_count
            reply_count
            moduledetails{
                modulename
                topicdetails{
                    topicname
                    status
                    activityid
                    courseid
                    coursename
                    modulename
                    startdate
                    enddate
                    activitytype
                    activityname
                    score
                    link
                    created_on
                    createdby_name
                    createdby_role
                    createdby_id
                    trainers{
                            name
                            role
                            role_type_id
                            role_type_name
                            userid
                            roleid
                            role_type
                    }
                    learners{
                        email
                        id
                        image
                        is_active
                        name
                        username
                    }
                    evaluationmode
                    resourcefile{
                        assignment
                        checked
                        doc_type
                        filename
                        path
                        size
                        type_name
                        _id
                    }
                }
            }
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
        author_details{
            image
            author_name
            description
        }
        pre_requisite{
            name
            image
        }
        catalogue_id
        super_sub_category_id
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
    }
    enrolled_course_details{
        _id
        course_id
        course_description
        course_name
        course_status
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
        feed_back
        course_long_description
        published_on_date
        completed_module_count
        completed_topic_count
        self_paced_learning_progression
        image_self_paced_learning_time
        total_module_count
        total_topic_count
        total_duration
        catalogue_id
        super_sub_category_id
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
            image
            author_name
            description
        }
    }
}
}
  }
`;

export const getLearnerenrolledCourses = gql`
  query getLearnerenrolledCourses(
    $user_id: String
    $user_obj_id: String
    $catalogue_id: String
    $category_id: String
    $jobRoleCategoryId: String
    $searchString: String
  ) {
    getLearnerenrolledCourses(
      user_id: $user_id
      user_obj_id: $user_obj_id
      catalogue_id: $catalogue_id
      category_id: $category_id
      jobRoleCategoryId: $jobRoleCategoryId
      searchString: $searchString
    ) {
      success
      message
      global_data{
        author
        credits
        course_progression_data{
          instructor_lead_session
          internal_assesment_completed
          mid_course_project_completed
          final_assesment_completed
        }
        on_hover_image_data{
          instructor_lead_session
          self_paced_learning
          mid_course_project
          internal_assesment
          final_assesment
        }
      }
      data {
        suspend {
          _id
          totalCount
          IncDecPec
          valueIncDecPec
        }
        incomplete {
          _id
          totalCount
          IncDecPec
          valueIncDecPec
        }
        courseEnrolled {
          course_id
          course_type
          course_mode
          course_start_datetime
          course_end_datetime
          course_name
          course_description
          short_description
          author_details {
            author_name
            description
            image
          }
          course_img_url
          rating
          price
          totalLearners
          assignmentCount
          forumCount
          categoryName
          batchCourse
          upComingLiveClassRoom{
            courseid
            link
            activitytype
            startdate
            enddate
            status
          }
          course_duration
          coursePlayerStatus {
            status
            course_percentage
            feedback_status
          }
          batch_details{
                course_id
                batch_details{
                    _id
                    batchname
                    batchdescription
                    batchstartdate
                    batchenddate
                    isTeams
                    created_on
                    batchid
                    user_details{
                            id
                            name
                            image
                            email
                            username
                            is_active
                    }
                    course_details{
                            id
                            name
                            image
                            description
                            super_sub_category_name
                            sub_category_name
                            category_name
                    }
                    instructur_details{
                            id
                            name
                            image
                            description
                            role
                            roleid
                            userid
                            role_type_id
                            role_type_name
                    }
                }
        }
        }
      }
    }
  }
`;


export const getTrendingcourse = gql`
  query get_trending_course {
    get_trending_course {
      success
      error_msg
      total_count
      data {
        course_id
        course_description
        course_name
        course_start_datetime
        course_end_datetime
        enrollment_start
        enrollment_end
        course_img_url
        short_description
      }
    }
  }
`;


export const getPopularCourse = gql`
  query get_popular_course {
    get_popular_course {
      success
      error_msg
      total_count
      data {
        course_id
        course_description
        course_name
        course_start_datetime
        course_end_datetime
        enrollment_start
        enrollment_end
        course_img_url
        short_description
      }
    }
  }
`;

// getting popular course

export const getPopularcourse = gql`
  query getPopularcourse {
    getPopularcourse {
      success
      error_msg
      data {
        course_id
        course_name
        course_img_url
        course_description
        rating
        price
        learner_count
        enrollment_end
        enrollment_start
      }
    }
  }
`;
export const getFeedbackQuestion = gql`
  query getFeedbackQuestion {
    getFeedbackQuestion {
      message
      success
      success
      message
      data {
        _id
        question
      }
    }
  }
`;
export const getCoursePlayerStatusForCourse = gql`
  query getCoursePlayerStatusForCourse($user_id: String!, $course_id: String!) {
    getCoursePlayerStatusForCourse(user_id: $user_id, course_id: $course_id) {
      success
      message {
        _id
        status
        location
        course_id
        feedback_status
        course_percentage
      }
    }
  }
`;

export const getAssignmentmoduleData = gql`
  query getAssignmentmoduleData($courseid: String, $user_id: String) {
    getAssignmentmoduleData(courseid: $courseid, user_id: $user_id) {
      success
      message
      data {
        courseid
        coursedetails {
          modulename
          moduledetails {
            topicname
            topicimages
            url
            resourse {
              assignment_count
              type
              type_name
              doc_type
              _id
              files {
                _id
                assignment
                path
                type_name
                doc_status
                grade_status
                score_mark
                resubmit
                doc_type
                score
                startDate
                endDate
              }
            }
          }
        }
        courseEndDate
        courseStartDate
      }
    }
  }
`;


export const getReadLearnerActivity = gql`
  query get_read_learner_activity($userid: String!, $date: String!) {
    get_read_learner_activity(userid: $userid, date: $date) {
      success
      error_msg
      message {
        _id
        status
        activity_details {
          topicname
          status
          courseid
          coursename
          modulename
          startdate
          enddate
          activitytype
          activityname
          resourcefile {
            assignment
            checked
            doc_type
            filename
            path
            size
            type_name
            _id
          }

          score
          link
          created_on
          createdby_name
          createdby_role
          createdby_id
        }
      }
    }
  }
`;

export const playerModuleAndTopic = gql`
  query playerModuleAndTopic($contentID: String, $user_id: String) {
    playerModuleAndTopic(contentID: $contentID, user_id: $user_id) {
      message {
        _id
        url
        total_topic_len
        course_id
        childData {
          title
          _id
          status
          topic_len
          moduletime
          children {
            _id
            title
            link
            status
            isVisible
            children {
              _id
            title
            link
            status
            isVisible
            children {
              _id
            title
            link
            status
            isVisible
            }
            }
          }
        }
      }
      success
    }
  }
`;
export const ViewSingleTopicDiscussionData = gql`
  query ViewSingleTopicDiscussionData($topic_slug: String, $uid: Int!) {
    ViewSingleTopicDiscussionData(topic_slug: $topic_slug, uid: $uid) {
      success
      message
      data {
        cid
        mainPid
        postcount
        slug
        tid
        title
        uid
        viewcount
        titleRaw
        timestampISO
        lastposttimeISO
        bookmark
        bookmarkThreshold
        category {
          cid
          name
          description
          link
          numRecentReplies
          parentCid
          post_count
          slug
          topic_count
          totalPostCount
          totalTopicCount
        }
        posts {
          content
          local_content
          deleted
          pid
          tid
          uid
          a2i_lable
          toPid
          bookmarks
          upvotes
          downvotes
          votes
          timestampISO
          user {
            fullname
            postcount
            uid
            username
            userslug
            lastonlineISO
            picture
          }
          bookmarked
          upvoted
          downvoted
          selfPost
          index
        }
      }
    }
  }
`;
export const ViewAllThreadDataBid = gql`
  query ViewAllThreadData($module_name: String, $course_id: String, $batch_id: String) {
    ViewAllThreadData(module_name: $module_name, course_id: $course_id, batch_id: $batch_id) {
      success
      message
      data {
        cid
        description
        name
        numRecentReplies
        order
        parentCid
        post_count
        slug
        topic_count
        totalPostCount
        totalTopicCount
        title
        topics {
          cid
          thread_status
          deleted
          postcount
          slug
          tid
          title
          uid
          viewcount
          titleRaw
          timestampISO
          lastposttimeISO
          category {
            name
            cid
          }
          user {
            fullname
            picture
            postcount
            status
            uid
            username
            userslug
          }
        }
      }
    }
  }
`;
export const ViewAllThreadData = gql`
  query ViewAllThreadData(
    $module_name: String
    $course_id: String
    $batch_id: String
  ) {
    ViewAllThreadData(
      module_name: $module_name
      course_id: $course_id
      batch_id: $batch_id
    ) {
      success
      message
      data {
        cid
        description
        name
        numRecentReplies
        order
        parentCid
        post_count
        slug
        topic_count
        totalPostCount
        totalTopicCount
        title
        topics {
          cid
          thread_status
          deleted
          postcount
          slug
          tid
          title
          uid
          viewcount
          titleRaw
          timestampISO
          lastposttimeISO
          category {
            name
            cid
          }
          user {
            fullname
            picture
            postcount
            status
            uid
            username
            userslug
          }
        }
      }
    }
  }
`;
export const getReadLeanerActivity = gql`
  query get_read_learner_activity($userid: String!, $date: String!, $courseid: String) {
    get_read_learner_activity(userid: $userid, date: $date, courseid: $courseid) {
      success
      error_msg
      message {
        _id
        status
        activity_details {
          topicname
          status
          courseid
          coursename
          modulename
          startdate
          enddate
          activitytype
          activityname
          resourcefile {
            assignment
            checked
            doc_type
            filename
            path
            size
            type_name
            _id
          }

          score
          link
          created_on
          createdby_name
          createdby_role
          createdby_id
        }
      }
    }
  }
`;


export const getOrganizationbyId = gql`
  query get_organization_by_id($organization_id: String) {
    get_organization_by_id(organization_id: $organization_id) {
      success
      error_msg
      message {
        _id
        is_active
        organization_name
        organization_logo
        organization_id
        created_by
        created_on
        updated_on
        updated_by
        learner_login_image
        role_details {
          _id
          role_id
          role_name
        }
        admin_details {
          _id
          admin_email
          admin_username
        }
        group_details {
          _id
          group_id
          group_name
        }
      }
    }
  }
`;
export const getCountForCategories = gql`
  query getCountForCategories($userObjId: String!) {
    getCountForCategories(userObjId: $userObjId) {
      message
      success
      data{
        catalogueId
        catalogueName
        categories{
          categoryId
          categoryName
          totalCount
          enrollCount
          subCategory{
            subCategoryId
            subCategoryName
            totalCount
            superSubCategory{
              superSubCategoryId
              superSubCategoryName
              totalCount
            }
          }
        }
      }
      }
    }
`;
export const getCoureBasedOnCatalog = gql`
  query getCoureBasedOnCatalog($catalogue_id: String!, $category_id: String!,
    $userObjId: String!, $subCategoryId: String, $superSubCategoryId: String) {
    getCoureBasedOnCatalog(catalogue_id: $catalogue_id,
      category_id: $category_id, userObjId: $userObjId, subCategoryId: $subCategoryId,
      superSubCategoryId: $superSubCategoryId) {
      data{
        course_id
        clamaiedStatus
        course_description
        course_name
        version
        course_start_datetime
        location
        course_end_datetime
        advertised_start
        course_img_url
        social_sharing_url
        certificate_display_behaviour
        certificate_name
        enrollment_start
        mobile_available
        short_description
      }
    }
  }
`;


export const getcalenderactivity = gql`
  query getcalenderactivity($userid: String!, $date: String!) {
    getcalenderactivity(userid: $userid, date: $date) {
      success
      error_msg
      message {
        start
        end
        title
      }
    }
  }
`;
export const singleBatchInfo = gql`
  query getbatchdetails($user_id: String!, $course_id: String!) {
    getbatchdetails(user_id: $user_id, course_id: $course_id) {
      success
      message {
        _id
        batchname
        batchdescription
        batchstartdate
        batchenddate
        isTeams
        created_on
        batchid
      }
    }
  }
`;

export const getCountForJobroleCategories = gql`
  query getCountForJobroleCategories($userObjId: String!) {
    getCountForJobroleCategories(userObjId: $userObjId) {
      success
      message
      data {
        jobroleCategoryId
        jobroleCategoryName
        jobroleEnrollCount
      }
    }
  }
      `;

export const getprojectActivityData = gql`
      query getprojectActivityData($userId: String, $courseId: String){
        getprojectActivityData(userId: $userId, courseId: $courseId){
        success
        data {
        _id
        projectActivity {
        activitystartdate
        activityenddate
        submit_status
        course_id
        batchid
        batchstartdate
        batchenddate
        activityId
        module_id
        activityname
        topic_id
        evaluationmode
        projecttype
        total_mark
        score_mark
        submitted_on
        submitted_date
        submitted_learner
        project_id
        grade_status
        instructor_status
        comments
        groupname
        groupcount
        videodetails{
        id
        videourl
        name
        size
        doc_type
        uploaded_date
        is_active
        }
        materialDetails{
          _id
          doc_type
          path
          type_name
          filename
          size
          assignment
          checked
      }
        groupDetails{
        id
        name
        username
        email
        }
        submitAction
        }
        }
        }
        }
`;
export const getperformActivityData = gql`
query getperformActivityData($userId: String , $courseId: String) {
  getperformActivityData(userId: $userId , courseId: $courseId ) {
    success
    data {
      _id
      performActivity {
        perform_id
        activitystartdate
        activityenddate
        submit_status
        submittedTotal
        course_id
        batchid
        batchstartdate
        batchenddate
        activityId
        iterationTotal
        module_id
        activityname
        topic_id
        evaluationmode
        materialDetails{
          _id
          doc_type
          path
          type_name
          filename
          size
          assignment
          checked
        }
        iterationDetails{
          iterationid
          iterationcount
          submit_status
          total_mark
          score_mark
          submitted_on
          submitted_date
          submitAction
          grade_status
          instructor_status
          comments
          videodetails{
            id
            videourl
            name
            size
            doc_type
            uploaded_date
            is_active
            }
            assessmentreport{
            id
            imageurl
            name
            doc_type
            size
          }
        }
      }
    }
  }
}
    `;


export const getCourseActivities = gql`
      query  get_course_activities($user_id:String! ,$pagenumber:String!, $course_id:String! , $sort_type:String!, $searchvalue:String!,$searchcolumn:String!, $status: String!) {
        get_course_activities(user_id:$user_id ,pagenumber:$pagenumber, course_id: $course_id ,sort_type: $sort_type,searchvalue: $searchvalue, searchcolumn:$searchcolumn, status: $status) {
          success
          message {
            _id
            course_id
            course_name
            module_name
            activity
            topic_name
            activity_name
            status
            score_mark
            total_mark
            score
            activitystartdate
            activityenddate
            iterationcount
          }
          total_count
        }
      }
          `;

export const getActivecourseCount = gql`
      query  get_active_course_count($user_id:String! ) {
        get_active_course_count(user_id:$user_id ) {
          success
          error_msg
          message{
                  _id
                  Yettosubmit
                  Overdue
                  Submitted
                  Graded
                  Completed
                  Allactivites
                  nextactivity{
                    activitystartdate
                     activityenddate
                     module_id
                     topic_id
                     activity
                     activityname
             }

          }
        }
      }
          `;

export const boarddetail = gql`
      query boarddetail($user_id: String, $course_id: String) {
        boarddetail(user_id : $user_id, course_id: $course_id) {
          success
          data
          {
              courseProgression
              moduleCovered
              topicCovered
              totalNumberOfModule
              totalNumberOfTopic
              totalNumberOfCompletedTopic
              onGoingTopicCount
              yetToStartTopic
              completedTopicPercentage
              onGoingTopicPercentage
              yetToStartTopicPercentage
              topicData{
                  topicName
                  duration
                  topicStatus
                  startDate
                  endDate
                  }
                  }
        }
      }
`;

export const getActivityDetailsByBatchAndCourseID = gql`
query get_course_activities_by_id( $batchid: String!, $courseid: String!){
  get_course_activities_by_id( batchid: $batchid, courseid: $courseid){
  success
  message
  data{
    _id
    topicDetails{
            topicname
            status
            activityid
            courseid
            coursename
            modulename
            startdate
            enddate
            activitytype
            activityname
            link
            created_on
            createdby_name
            createdby_role
            createdby_id
            resourcefile{
              _id
              doc_type
              path
              type_name
              filename
              size
              assignment
              checked
            }
            Status
    }
  }
}
}
`;

export const getTopicAttendanceDetailsByUsername = gql`
query getTopicAttendanceDetailsByUsername( $courseid: String!, $full_name: String!, $user_id: String!){
  getTopicAttendanceDetailsByUsername( courseid: $courseid, full_name: $full_name, user_id: $user_id ){
      success
      message
      data{
        Attendance{
            _id
            activity{
                topicname
                status
                activityid
                courseid
                coursename
                modulename
                startdate
                enddate
                activitytype
                activityname
                link
                created_on
                createdby_name
                createdby_role
                createdby_id
                copy
                topictype
                groupname
                iterations
                evaluationtype
                livethumbnail
                attendencefile
                attendencedetails{
                    Learners
                    Attendence
                }
                evaluationmode
                trainers
                learners
                resourcefile
            }
        }
        Activity{
            _id
            status
            activity_details{
                    topicname
                    status
                    activityid
                    courseid
                    coursename
                    modulename
                    startdate
                    enddate
                    activitytype
                    activityname
                    link
                    created_on
                    createdby_name
                    createdby_role
                    createdby_id
                    copy
                    topictype
                    groupname
                    iterations
                    evaluationtype
                    livethumbnail
                    attendencefile
                    attendencedetails{
                        Learners
                        Attendence
                    }
                    evaluationmode
                    trainers
                    learners
                    resourcefile
            }
        }
    }
  }
}
`;
