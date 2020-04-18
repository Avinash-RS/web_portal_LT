import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class WcaService {

url="http://127.0.0.1:9001/api/courses/getpublishedcourse"

  constructor(private http: HttpClient) { }

  getPublishedCourse() {
    return this.http.get(this.url);
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


}
