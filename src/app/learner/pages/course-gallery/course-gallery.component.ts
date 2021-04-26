import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { KnowledgePreviewComponent } from '../knowledge-preview/knowledge-preview.component';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-course-gallery',
  templateUrl: './course-gallery.component.html',
  styleUrls: ['./course-gallery.component.scss']
})
export class CourseGalleryComponent implements OnInit {
  @ViewChild(DragScrollComponent) ds: DragScrollComponent;
  course: any;
  coursedata;
  selectedTopic;
  emptyGallery = false;
  leftNavDisabled = true;
  rightNavDisabled = true;
  selectedIndex = 0;
  galleryUrl: any = environment.galleryURL;
  filterValue;
  searchDetails = '';
  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private learnerService: LearnerServicesService, public dialog: MatDialog,private loader: Ng4LoadingSpinnerService) {
    this.activeRoute.queryParams.subscribe(res => {
      this.course = res;
    });
   }

  ngOnInit() {
    this.getGalleryData(0)
  }

  getBack(){
    this.router.navigateByUrl('/Learner/MyCourse');
  }


  getGalleryData(content){
    this.loader.show();
    this.learnerService.getcourseGallery(this.course.id).subscribe((data)=>{
      if(data.data['getCourseGallery']['data']['coursedetails']) {
        this.coursedata = data.data['getCourseGallery']['data']['coursedetails']
        if(content == 0){
        this.coursedata.forEach((data1)=>{
          data1.moduledetails[0].activeTopic = 'active'
          data1.moduledetails.forEach((data2) => {
            data2.allContent = [...data2.image,...data2.video]
            data2.allContent.push({
              'link' : data2.link,
              'type' : 'kc',
              'fileName' : data2.topicname
             })
          });
        })
        }
        // this.coursedata.forEach(element1 => {
        //   element1.moduledetails[0].activeTopic = 'active'
        // });
        this.loader.hide();
      }
      else {
        this.loader.hide();
        this.emptyGallery = true;
      }
    })
  }
  contentChange(){
    this.coursedata.forEach((data1)=>{
      data1.moduledetails.forEach((data2) => {
        data2.activeTopic = ''
      })
      data1.moduledetails[0].activeTopic = 'active' 
    })
  }
  onTopicSelection(moduleName,topicname) {
    this.coursedata.forEach((data1)=>{
      if(data1.modulename == moduleName) {
        data1.moduledetails.forEach((data2)=>{
          data2.activeTopic = ''
          if(data2.topicname == topicname) {
            data2.activeTopic = 'active'
          }
        })
      }
    })
    }
  moveLeft() {
    this.ds.moveLeft();
  }
  moveRight() {
    this.ds.moveRight();
  }
  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }
  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  onPreviewgallery(type,path1,path2,from) {
    var file;
    if(from == 'all' && type == 'kc') {
      path2 = path1
    }
    if(type == 'video' || type == 'image'){
      file = this.galleryUrl + '/'  + path1
    } else{
      file = this.galleryUrl  + path2
    //   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl
    //       (environment.scormUrl + '/scormPlayer.html?contentID=' +
    //         this.courseid + '&user_id=' + this.getuserid.user_id + '&user_obj_id=' +
    //         this.getuserid._id + '&path=' + this.gettopicLink.link +
    //         '&module_status=' + this.moduleSatusCheck
    //         + '&module=' + this.moduleInfo.title + '&topic=' + this.gettopicLink.title + '&action=Next' + '&token=' + this.user_token);
     }
     if(type == 'kc') {
       type = 'HTML'
     }
    let height = '70%';
    let width = '55%';
    if (type === 'pdf') {
      height = '90%';
      width = '70%';
    }
    const dialogRef = this.dialog.open(KnowledgePreviewComponent, {
      data: {
        file,
        fileType : type
      },
      height,
      width,
      backdropClass: 'preview-popup-background',
      panelClass: 'knowledge-preview-popup',
      closeOnNavigation: true
    }).afterClosed().subscribe((res) => {
    });
  }

}
