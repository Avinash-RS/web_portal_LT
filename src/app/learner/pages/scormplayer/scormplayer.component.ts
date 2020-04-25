import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-scormplayer',
  templateUrl: './scormplayer.component.html',
  styleUrls: ['./scormplayer.component.scss']
})
export class ScormplayerComponent implements OnInit {
  contentid: any;
  content: any;
  syllabus: any;
  modules: any [];
  authorDetails: any [];
  name = 'Set iframe source';
  url: string 
  urlSafe: SafeResourceUrl;
  user_id:any
  breakpoint: number;
  course_id:any;
  courseDeatils: any;

  constructor(public sanitizer: DomSanitizer,    public spinner: NgxSpinnerService,public activatedRoute: ActivatedRoute,  private alert: AlertServiceService,
    public service: LearnerServicesService, public route: Router,public commonService : CommonServicesService,) { 
      var detail = (this.route.getCurrentNavigation() && this.route.getCurrentNavigation().extras && 
      this.route.getCurrentNavigation().extras.state && this.route.getCurrentNavigation().extras.state.detail);
      console.log(detail)
      this.contentid = detail.id;
      this.user_id = detail.user;
      this.course_id=detail.course_id
      localStorage.setItem('scorm_user_id',this.user_id)
      localStorage.setItem('course_id',this.course_id)
      this.spinner.show();
      this.commonService.viewCurseByID (this.course_id).subscribe(data => {
        if(data.data['viewcourse'].success == true){
          this.courseDeatils = data.data['viewcourse']['message'][0];
          console.log(this.courseDeatils )
          this.authorDetails  =  this.courseDeatils.author_details;
          this.spinner.hide();
        }else{
          this.spinner.hide();
          this.alert.openAlert(data.data['viewcourse']['error_msg'],null)
        }
       
      })
    }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.contentid='dfdfd'
    this.url=environment.scormUrl+'scormPlayer.html?contentID='+this.contentid+'&user_id='+this.user_id+'&course_id='+this.course_id
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
   // this.getcoursedetail()
    this.getModuleData();
  }
  getcontent() {
    this.service.list_content().subscribe(data => {
    })
  }
  getcoursedetail() {
    this.contentid = 'Golf Explained - Sequencing Random Test'
    this.service.syllabus_of_particular_scorm(this.contentid,'3qpai7',"1").subscribe(data => {

      this.content = data.data
      if(this.content&&this.content.syllabus_of_particular_scorm&&this.content.syllabus_of_particular_scorm.success){
        this.syllabus = this.content.syllabus_of_particular_scorm.data[0].scorm_dtl_user_map
        this.modules = this.syllabus[0].children;
        console.log( this.modules)
      }else{
        console.log('no record')
      }
      
    })
  }


  // this.course_id
  getModuleData() {
    this.service.getModuleData("1").subscribe(data => {
      console.log(data)
      this.content = data.data
      if(this.content&&this.content.getModuleData&&this.content.getModuleData.success){
         this.content = this.content.getModuleData.data[0]
      }   
    })
  }


  onResize(event) {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  
  }
}
