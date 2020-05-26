import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, } from 'rxjs';
import { tap } from 'rxjs/operators'
//change rajesh ranjan
import { Apollo } from "apollo-angular";
import { remove_doc_ref, getallrefdoc, get_module_topic } from "./operations/wca_query";

import { HttpHeaders } from '@angular/common/http';


//import {} from "./operations/learner_mutation"

//change rajesh ranjan
@Injectable({
  providedIn: 'root'
})
export class WcaService {

  url = "http://localhost:9001/api/upload/uploadExcel"

  bSubject = new BehaviorSubject({});
  bSubject1 = new BehaviorSubject({});


  token: String;


  constructor(private http: HttpClient, private Apollo: Apollo, ) {



  }


  getcourseDetails(courseID) {
    var headers = new HttpHeaders()
      .set("Authorization", "Bearer 104150f8e66cae68b40203e1dbba7b4529231970");
    return this.http.post(environment.createCourseApi + 'viewcourse', courseID, { headers });
  }

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
    return this.http.get(environment.wcaapiurl + "api/template/getalltemplates");
  }


  uploadImage(image) {
    return this.http.post(environment.apiUrlImg + 'upload/image', image);
  }

  uploadScromCourse(file) {
    return this.http.post(environment.wcaapiurl + 'api/upload/uploadscromfile', file);
  }

  createCourse(course) {

    var headers = new HttpHeaders()
      .set("Authorization", "Bearer 104150f8e66cae68b40203e1dbba7b4529231970");

    // httpOptions.headers.append('Authorization', 'Bearer ' + this.token);
    // httpOptions.headers.append('Content-Type' , 'application/json');

    // console.log(httpOptions)


    return this.http.post(environment.createCourseApi + 'coursecreation', course, { headers });
  }

  updateCourse(course) {
    var headers = new HttpHeaders()
      .set("Authorization", "Bearer 104150f8e66cae68b40203e1dbba7b4529231970");
    return this.http.post(environment.createCourseApi + 'updatecourse', course, { headers });
  }

  getAllInstructors() { return this.http.get(environment.wcaapiurl + 'api/lov/getinstructordetails'); }

  getAllTakeawayDetails() { return this.http.get(environment.wcaapiurl + 'api/lov/gettakewaydetails'); }

  getAllPrerequisitDetails() { return this.http.get(environment.wcaapiurl + 'api/lov/getprerequisitdetails'); }

  getAllCertifyDetails() { return this.http.get(environment.wcaapiurl + 'api/lov/getcertificationdetails'); }

  createTemplate(arraydata) { return this.http.post(environment.wcaapiurl + 'api/template/savetemplate', arraydata); }

  refDocUpload(fromdata) { return this.http.post(environment.apiUrl + 'wca/refdocupload', fromdata) }

  remove_doc_ref(id) {
    return this.Apollo.query({
      query: remove_doc_ref,
      variables: {
        doc_id: id

      }
    });
  }
  getallrefdoc(pagenumber) {
    return this.Apollo.query({
      query: getallrefdoc,
      variables: {
        pagenumber: pagenumber

      }
    });
  }
  getsingleTemplate(template) { return this.http.get(environment.wcaapiurl + 'api/template/getalltemplates?template_id=' + template); }

  createDraft(draft) { return this.http.post(environment.wcaapiurl + 'api/courses/createscrom', draft); }

  saveCourse(data) { return this.http.post(environment.wcaapiurl + 'api/courses/createcourse', data); }


  getCourseDetails(id) { return this.http.get(environment.wcaapiurl + 'api/courses/getscrommodules?courseid=' + id); }

  excelUpload(excel) { return this.http.post(environment.apiUrl + 'wca/uploaddocument', excel); }

  uploadKnowledgeCheck(fileData) { return this.http.post(environment.wcaapiurl + 'api/upload/uploadexcelfile', fileData) }

  getPreviewData(path) { return this.http.post(environment.wcaapiurl + 'api/module/getquestions', { file: path }) }
  repositoryModules() {
    return this.http.get(environment.wcaapiurl + 'api/module/viewrepomodules', {});
  }

  postRepoModules(data) {
    return this.http.post(environment.wcaapiurl + 'api/module/savemodules', data);
  }

  updatecoursetomudules(data) {
    return this.http.get(environment.wcaapiurl + 'api/module/updatecoursetomudules', data);
  }

  deactivateModule(data) {
    return this.http.post(environment.wcaapiurl + 'api/module/updaterepomodulestatus', data);
  }

  



  handleKeydown(event) {
    // tslint:disable-next-line: deprecation
    if (event.keyCode === 32) {
      // do not propagate spaces to MatSelect, as this would select the currently active option
      event.stopPropagation();
    }
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    }
  }
  get_module_topic() {
    return this.Apollo.query({
      query: get_module_topic
    });
  }
    
}
