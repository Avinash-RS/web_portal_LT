import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';
//change rajesh ranjan
import { Apollo } from "apollo-angular";
import {remove_doc_ref,getallrefdoc} from "./operations/wca_query";

//import {} from "./operations/learner_mutation"

//change rajesh ranjan
@Injectable({
  providedIn: 'root'
})
export class WcaService {

url="http://127.0.0.1:9001/api/courses/getpublishedcourse"

bSubject = new BehaviorSubject({}); 

  constructor(private http: HttpClient,private Apollo: Apollo,) { }

  getPublishedCourse() {
    return this.http.get(environment.wcaapiurl + "api/courses/getpublishedcourse");
  }
  getCreatedCourse() {
    return this.http.get(environment.wcaapiurl + "api/courses/getcreatedcourse");
  }
  getDraftCourse() {
    return this.http.get(environment.wcaapiurl + "api/courses/getdraftcourse");
  }

  getAllTemplates() {
    return this.http.get( environment.wcaapiurl + "api/template/getalltemplates");
  }


  uploadImage(image) {return this.http.post(environment.apiUrlImg + 'upload/image', image); }

  createCourse(course) { return this.http.post(environment.wcaapiurl + 'api/courses/savecourse', course); }

  getAllInstructors() { return this.http.get(environment.wcaapiurl + 'api/lov/getinstructordetails'); }

  getAllTakeawayDetails() { return this.http.get(environment.wcaapiurl + 'api/lov/gettakewaydetails'); }

  getAllPrerequisitDetails() { return this.http.get(environment.wcaapiurl + 'api/lov/getprerequisitdetails'); }

  getAllCertifyDetails() { return this.http.get(environment.wcaapiurl + 'api/lov/getcertificationdetails'); }

  createTemplate(arraydata) { return this.http.post(environment.wcaapiurl + 'api/template/savetemplate',arraydata); }

  refDocUpload(fromdata){ return this.http.post(environment.apiUrl+ 'wca/refdocupload',fromdata)}

  remove_doc_ref(id) {
    return this.Apollo.query({
      query: remove_doc_ref,
      variables: {
        doc_id:id

      }
    });
  }
  getallrefdoc(pagenumber){
    return this.Apollo.query({
      query: getallrefdoc,
      variables: {
        pagenumber:pagenumber

      }
    });
  }
}
