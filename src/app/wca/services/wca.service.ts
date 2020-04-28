import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WcaService {

url="http://127.0.0.1:9001/api/courses/getpublishedcourse"

bSubject = new BehaviorSubject({}); 

  constructor(private http: HttpClient) { }

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

  getsingleTemplate(template) { return this.http.get(environment.wcaapiurl + 'api/template/getalltemplates?template_id='+template); }

  createDraft(draft) {return this.http.post(environment.wcaapiurl + 'api/scorm/createscrom',draft);}

  getCourseDetails(id) {return this.http.get(environment.wcaapiurl +  'api/courses/getscrommodules?courseid='+id); }

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

}
