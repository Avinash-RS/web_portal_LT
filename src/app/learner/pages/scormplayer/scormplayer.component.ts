import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-scormplayer',
  templateUrl: './scormplayer.component.html',
  styleUrls: ['./scormplayer.component.scss']
})
export class ScormplayerComponent implements OnInit {
  contentid: any;
  content: any;
  syllabus: any;
  name = 'Set iframe source';
  url: string 
  urlSafe: SafeResourceUrl;

  // state$: Observable<object>;

  constructor(public sanitizer: DomSanitizer,public activatedRoute: ActivatedRoute, public service: LearnerServicesService, public route: Router) { }

  ngOnInit() {
    this.contentid = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.contentid)
    this.url='http://40.76.47.212:8080/scormPlayer.html?contentID='+this.contentid
    // this.getcontent();
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    
   // this.getcoursedetail();

  }
  /*getcontent() {
    this.service.list_content().subscribe(data => {
      // console.log(data)

    })
  }
  getcoursedetail() {
    // this.contentid = 'FSL'
    this.service.syllabus_of_particular_scorm(this.contentid).subscribe(data => {

      this.content = data.data
      this.syllabus = this.content.syllabus_of_particular_scorm.data
      // console.log(this.syllabus)
    })
  }*/
}
