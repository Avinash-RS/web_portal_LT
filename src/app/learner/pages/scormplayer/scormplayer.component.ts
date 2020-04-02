import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
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
  user_id:any
  // state$: Observable<object>;

  constructor(public sanitizer: DomSanitizer,public activatedRoute: ActivatedRoute, 
    public service: LearnerServicesService, public route: Router) { 
      var detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras && 
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
      console.log(detail)
      this.contentid = detail.id;
      this.user_id = detail.user;
    }

  ngOnInit() {
    console.log(this.contentid,this.user_id)
    this.url=environment.scormUrl+'scormPlayer.html?contentID='+this.contentid+'&user_id='+this.user_id
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
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
