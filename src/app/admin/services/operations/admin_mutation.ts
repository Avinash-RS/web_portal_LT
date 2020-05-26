import gql from 'graphql-tag';

// tslint:disable-next-line:variable-name
export const user_registration = gql`
  mutation user_registration($full_name: String!, $email: String!,$term_condition:Boolean,$group_id:String,
    $group_name: String,$admin: [String]) {
    user_registration(
      full_name: $full_name
      email: $email,
      term_condition: $term_condition,
      group_id: $group_id,
      group_name: $group_name,
      admin: $admin
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
  }`;

// tslint:disable-next-line:variable-name
export const update_group = gql`
mutation update_group($_id: String!, $group_name: String!, $group_id: String!){
  update_group(_id: $_id,group_name: $group_name, group_id: $group_id) {
    success
    error_msg
    message
  }
}`;

// tslint:disable-next-line:variable-name
export const create_catelogue = gql`
mutation create_catelogue(
  $input_name: String!,
  $input_description: String!,
  $input_image: String!,
  $creator_id: String!,
  $level: Int!,
  $apply_all_courses: Boolean!,
  $course_id: [String]!,
  $parent_category_id: String!,
  $parent_sub_category_id: String!){
  create_catelogue(input_name: $input_name,input_description: $input_description, input_image: $input_image,
    creator_id : $creator_id,parent_sub_category_id: $parent_sub_category_id,level: $level, course_id: $course_id,
    apply_all_courses : $apply_all_courses, parent_category_id: $parent_category_id) {
    success
    error_msg
    message
  }
}`;

export const createusergroup = gql`
  mutation createusergroup($group_name: String!, $group_type: String!, $parent_group_id: String!, $hierarchy_id: String!,
     $admin_id: String!, $catalogue_id : String!) {
  createusergroup(group_name: $group_name,group_type: $group_type,
  parent_group_id: $parent_group_id,hierarchy_id: $hierarchy_id,admin_id: $admin_id,catalogue_id: $catalogue_id) {
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
      parent_id
    }
  }
}`;

// tslint:disable-next-line:variable-name
export const update_notification = gql`
mutation update_notification($report_id: String!){
  update_notification(report_id: $report_id) {
    success
    error_msg
    message
  }
}`;

export const groupstatus = gql`
mutation groupstatus($group_id: String!, $is_active: Boolean!){
  groupstatus(group_id : $group_id,is_active: $is_active){
      success
      message
      error_msg
  }
}`;

export const reassigncourse = gql`
  mutation reassigncourse(
    $old_level:  Int!,
    $old_category_id: String!,
    $old_sub_category_id: String!,
    $old_super_sub_category_id: String!,
    $level: Int!,
    $apply_all_courses: Boolean!,
    $course_id: [String]!,
    $category_id: String!,
    $sub_category_id: String!,
    $super_sub_category_id: String!){
      reassigncourse(old_level: $old_level,old_category_id: $old_category_id, old_sub_category_id: $old_sub_category_id,
        old_super_sub_category_id : $old_super_sub_category_id,level: $level,apply_all_courses: $apply_all_courses, course_id: $course_id,
        category_id : $category_id, sub_category_id: $sub_category_id, super_sub_category_id: $super_sub_category_id) {
      success
      error_msg
      message
    }
  }`;

// tslint:disable-next-line:variable-name
export const update_catalogue = gql`
  mutation update_catalogue($input_id: String!, $input_name: String!,$input_description: String,
     $input_image: String,$level: Int!){
    update_catalogue(input_id : $input_id,input_name: $input_name,input_description: $input_description,
      input_image: $input_image,level: $level){
      success
      message
      error_msg
    }
  }`;

// tslint:disable-next-line:variable-name
export const delete_catalogue = gql`
mutation delete_catalogue($input_id: String! ,$level: Int!) {
  delete_catalogue(input_id: $input_id,level: $level){
    success
    error_msg
    message
  }
}`;

// tslint:disable-next-line:variable-name
export const create_master_catalogue = gql`
mutation  create_master_catalogue($catalogue_name: String! ,$catalogue_description : String!,$creator_id: String!) {
  create_master_catalogue(catalogue_name: $catalogue_name,catalogue_description: $catalogue_description,creator_id:$creator_id ){
    success
    error_msg
    message
  }
}`;

export const updatecatalogueinfo = gql`
mutation  updatecatalogueinfo($catalogue_name: String! ,$catalogue_description : String!,$catalogue_id: String!) {
  updatecatalogueinfo(catalogue_name: $catalogue_name,catalogue_description: $catalogue_description,catalogue_id:$catalogue_id ){
    success
    error_msg
    message
  }
}`;

export const coursecataloguemapping = gql`
mutation coursecataloguemapping($catalogue_id: String! ,$course_id: [String]! , $select_all: Boolean!) {
  coursecataloguemapping(catalogue_id: $catalogue_id,course_id: $course_id, select_all: $select_all){
    success
    error_msg
    message
  }
}`;

export const unmapcoursesfromcatalogue = gql`
mutation unmapcoursesfromcatalogue($catalogue_id: String! ,$course_id: [String]! , $select_all: Boolean!) {
  unmapcoursesfromcatalogue(catalogue_id: $catalogue_id,course_id: $course_id, select_all: $select_all ){
    success
    error_msg
    message
  }
}`;
// mutation{
//   create_master_catalogue(
//     catalogue_name: "sample 1",
//     catalogue_description : "sample catalogue number 1",
//     creator_id : "5e69f4ad139c79bbf14adc8a"
//   ){
//     success
//     error_msg
//     message
//   }
// }

export const rejectenrollment = gql`
mutation reject_enrollment ($update_type: String!, $status_reason: String!,$enrollments: [enrollments_dtl]){
  reject_enrollment(update_type: $update_type, status_reason: $status_reason, enrollments: $enrollments ){
      success
      error_msg
      message
  }
}` ;


export const approveenrollment = gql`
mutation approve_enrollment ($update_type: String!, $status_reason: String!,$enrollments: [enrollments_dtl]){
  approve_enrollment(update_type: $update_type, status_reason: $status_reason, enrollments: $enrollments ){
      success
      error_msg
      message
  }
}` ;
