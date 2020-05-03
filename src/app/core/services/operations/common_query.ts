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

            name

            description

            image

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

            name

            description

            image

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

          name

          description

          image

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

        }
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

