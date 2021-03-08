import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // change rajesh ranjan
import { Apollo } from 'apollo-angular';
import { remove_doc_ref, getallrefdoc, get_module_topic } from './operations/wca_query';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
  .append('Authorization', 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970')
};

// const headers = new HttpHeaders()
//       .set('Authorization', 'Bearer 104150f8e66cae68b40203e1dbba7b4529231970');
// change rajesh ranjan
@Injectable({
  providedIn: 'root'
})
export class WcaService {

  url = 'http://localhost:9001/api/upload/uploadExcel';
 envWcaApi:any = environment.wcaapiurl;
 envApi:any = environment.apiUrl;
 envCourseApi:any =environment.createCourseApi
  bSubject = new BehaviorSubject({});
  bSubject1 = new BehaviorSubject({});
  token: string;

  constructor(private http: HttpClient,
              private apollo: Apollo, ) { }


  getcourseDetails(courseID) {
    // var headers = new HttpHeaders()
    //   .set("Authorization", "Bearer 104150f8e66cae68b40203e1dbba7b4529231970");
    return this.http.post(this.envCourseApi + 'viewcourse', courseID, httpOptions);
  }

  getPublishedCourse() {
    return this.http.get(this.envWcaApi + 'api/courses/getpublishedcourse');
  }
  getCreatedCourse() {

    return this.http.get(this.envWcaApi + 'api/courses/getcreatedcourse');
  }
  getDraftCourse() {
    return this.http.get(this.envWcaApi + 'api/courses/getdraftcourse');
  }

  getAllTemplates() {
    return this.http.get(this.envWcaApi + 'api/template/getalltemplates');
  }

  uploadImage(image) {
    return this.http.post(this.envWcaApi + 'api/upload/uploadimagefile', image);
  }

  uploadScromCourse(file) {
    return this.http.post(this.envWcaApi + 'api/upload/uploadscromfile', file);
  }

  createCourse(course) {
    // httpOptions.headers.append('Authorization', 'Bearer ' + this.token);
    // httpOptions.headers.append('Content-Type' , 'application/json');
    return this.http.post(this.envCourseApi + 'coursecreation', course, httpOptions);
  }

  updateCourse(course) {
    return this.http.post(this.envCourseApi + 'updatecourse', course, httpOptions);
  }

  getAllInstructors() {
    return this.http.get(this.envWcaApi + 'api/lov/getinstructordetails');
  }

  getAllTakeawayDetails() { return this.http.get(this.envWcaApi + 'api/lov/gettakewaydetails'); }

  getAllPrerequisitDetails() { return this.http.get(this.envWcaApi + 'api/lov/getprerequisitdetails'); }

  getAllCertifyDetails() { return this.http.get(this.envWcaApi + 'api/lov/getcertificationdetails'); }

  createTemplate(arraydata) { return this.http.post(this.envWcaApi + 'api/template/savetemplate', arraydata); }

  refDocUpload(fromdata) { return this.http.post(this.envApi + 'wca/refdocupload', fromdata); }
  
  editrefdocupload(data) { return this.http.post(this.envApi + 'wca/editrefdocupload', data); }
  uploadAssignments(fromdata) { return this.http.post(this.envApi + 'wca/learnerscorefile', fromdata); }

  remove_doc_ref(id) {
    return this.apollo.query({
      query: remove_doc_ref,
      variables: {
        doc_id: id

      }
    });
  }
  getallrefdoc(pagenumber, courseId) {
    return this.apollo.query({
      query: getallrefdoc,
      variables: {
        pagenumber,
        course_id: courseId
      }
    });
  }
  getsingleTemplate(template) { return this.http.get(this.envWcaApi + 'api/template/getalltemplates?template_id=' + template); }

  createDraft(draft) { return this.http.post(this.envWcaApi + 'api/courses/createscrom', draft); }

  saveCourse(data) { return this.http.post(this.envWcaApi + 'api/courses/createcourse', data); }


  getCourseDetails(id) { return this.http.get(this.envWcaApi + 'api/courses/getscrommodules?courseid=' + id); }

  excelUpload(excel) { return this.http.post(this.envApi + 'wca/uploaddocument', excel); }

  excelPpt(ppt) { return this.http.post(this.envWcaApi + 'api/template/pdftoimage', ppt); }

  uploadKnowledgeCheck(fileData) { return this.http.post(this.envWcaApi + 'api/upload/uploadexcelfile', fileData); }

  getPreviewData(path) { return this.http.post(this.envWcaApi + 'api/module/getquestions', { file: path }); }
  repositoryModules() {
    return this.http.get(this.envWcaApi + 'api/module/viewrepomodules', {});
  }

  postRepoModules(data) {
    return this.http.post(this.envWcaApi + 'api/module/savemodules', data);
  }

  updatecoursetomudules(data) {
    return this.http.post(this.envWcaApi + 'api/module/updatecoursetomudules', data);
  }

  deactivateModule(data) {
    return this.http.post(this.envWcaApi + 'api/module/updaterepomodulestatus', data);
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
    return this.apollo.query({
      query: get_module_topic
    });
  }

  checkCourseName_Availability(courseName): Observable<any> { // Check Course Name Avalailability
    return this.http.get(this.envCourseApi + 'checkcoursename?course_name=' + courseName, httpOptions)
    .pipe(tap());
  }

}
