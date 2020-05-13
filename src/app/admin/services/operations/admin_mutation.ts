import gql from "graphql-tag";

export const user_registration = gql`
  mutation user_registration($full_name: String!, $email: String!,$term_condition:Boolean,$group_id:String,$group_name: String,$admin: [String]) {
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
  }
`;

export const update_group = gql`
mutation update_group($_id: String!, $group_name: String!, $group_id: String!){
  update_group(_id: $_id,group_name: $group_name, group_id: $group_id) {
    success
    error_msg
    message
  }
}`

// export const create_catelogue = gql`
// mutation create_catelogue($input_name: String, $input_description: String, $input_image: String,
//   $creator_id: String, $level: Number, $input_image: String, $apply_all_courses: Boolean, $course_id: [String],
//   $parent_category_id: String, $parent_sub_category_id: String){
//   create_catelogue(input_name: $input_name,group_name: $group_name, group_id: $group_id) {
//     success
//     error_msg
//     message
//   }
// }`

// mutation{
//   create_catelogue(
//     input_name : "Civil And Structural Framework",
//     input_description : "All the Civil And Structural Framework related courses will be under this category",
//     input_image : "https://3.imimg.com/data3/EO/IQ/MY-10638644/civil-and-structural-design-detailing-250x250.png",
//     creator_id : "5e69f4ad139c79bbf14adc8a",
//     level : 2,
//     apply_all_courses : false,
//     course_id : ["1mfku71m", "2ae80xyq"],
//     parent_category_id : "hjkjswv5g",
//     parent_sub_category_id : "null"
//   ){
//     success
//     error_msg
//     message
//   }
// }

export const createusergroup = gql`
  mutation createusergroup($group_name: String!, $group_type: String!, $parent_group_id: String!, $hierarchy_id: String!, $admin_id: String!) {
  createusergroup(group_name: $group_name,group_type: $group_type,
  parent_group_id: $parent_group_id,hierarchy_id: $hierarchy_id,admin_id: $admin_id) {
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
}
`;

export const update_notification = gql`
mutation update_notification($report_id: String!){
  update_notification(report_id: $report_id) {
    success
    error_msg
    message
}
}`

export const groupstatus = gql`
mutation groupstatus($group_id: String!, $is_active: Boolean!){
  groupstatus(group_id : $group_id,is_active: $is_active){
      success
      message
      error_msg
  }
}`