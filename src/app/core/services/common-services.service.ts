import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { logout, viewcourse, view_wishlist,list_content, syllabus_of_particular_scorm} from "@core/services/operations/common_query";
import { add_to_wishlist, delete_wishlist,getPlayerStatus } from "@core/services/operations/common_mutation";

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(private Apollo: Apollo) { }

  logout(user_id, is_admin) {
    return this.Apollo.query({
      query: logout,
      variables: {
        user_id: user_id,
        is_admin: is_admin
      }
    });
  }

  viewCurseByID(course_id) {
    return this.Apollo.query({
      query: viewcourse,
      variables: {
        course_id: course_id,
      }
    });
  }

  viewWishlist(user_id) {
    return this.Apollo.query({
      query: view_wishlist,
      variables: {
        user_id: user_id,
      }
    });
  }

  addWishlist(course_id,user_id) {
    return this.Apollo.query({
      query: add_to_wishlist,
      variables: {
        course_id: course_id,
        user_id : user_id
      }
    });
  }

  removeWishlist(wishlist_id) {
    return this.Apollo.query({
      query: delete_wishlist,
      variables: {
        wishlist_id: wishlist_id,
      }
    });
  }
  list_content() {
    return this.Apollo.query({
      query: list_content,
    });
  }
  
  syllabus_of_particular_scorm(contentid) {
    return this.Apollo.query({
      query: syllabus_of_particular_scorm,
      variables: {
        contentid: contentid,
      }
    });
  }
  getPlayerStatus(id){
    return this.Apollo.query({
      query: getPlayerStatus,
      variables: {
        user_id:id
      }
    });
  }
}
