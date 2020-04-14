import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WcaService {


url="http://127.0.0.1:9001/api/courses/getpublishedcourse"

  constructor(private http: HttpClient) { }

  getPublishedCourse() {
    return this.http.get(this.url);
  }




}
