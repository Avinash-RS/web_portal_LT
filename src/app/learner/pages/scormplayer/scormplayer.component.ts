import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
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
  breakpoint: number;
  course_id:any;
  // state$: Observable<object>;

  constructor(public sanitizer: DomSanitizer,public activatedRoute: ActivatedRoute, 
    public service: LearnerServicesService, public route: Router) { 
      var detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras && 
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
      console.log(detail)
      this.contentid = detail.id;
      
      this.user_id = detail.user;
      this.course_id=detail.course_id
      localStorage.setItem('scorm_user_id',this.user_id)
      localStorage.setItem('course_id',this.course_id)
    }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.contentid='dfdfd'
    this.url=environment.scormUrl+'scormPlayer.html?contentID='+this.contentid+'&user_id='+this.user_id+'&course_id='+this.course_id
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.getcoursedetail()
  }
  getcontent() {
    this.service.list_content().subscribe(data => {
      // console.log(data)

    })
  }
  getcoursedetail() {
    this.contentid = 'Golf Explained - Sequencing Random Test'
    this.service.syllabus_of_particular_scorm(this.contentid,'3qpai7',"1").subscribe(data => {

      this.content = data.data
      if(this.content&&this.content.syllabus_of_particular_scorm&&this.content.syllabus_of_particular_scorm.success){
        this.syllabus = this.content.syllabus_of_particular_scorm.data[0].scorm_dtl_user_map
        console.log(this.syllabus)
      }else{
        console.log('no record')
      }
      
    })
  }


  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  
  }
}
