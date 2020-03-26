import gql from "graphql-tag";

export const add_to_wishlist = gql`
mutation add_to_wishlist($user_id: String, $course_id: String){
    add_to_wishlist(user_id: $user_id, course_id: $course_id) {
      success
      message
      error_msg,
      wishlist_id
    }
  }`;

export const delete_wishlist = gql`
  mutation delete_wishlist($wishlist_id: String){
    delete_wishlist(wishlist_id: $wishlist_id) {
      success
      message
      error_msg
    }
}`; 