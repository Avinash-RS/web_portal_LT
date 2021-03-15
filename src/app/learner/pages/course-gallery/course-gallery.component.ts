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
  leftNavDisabled = false;
  rightNavDisabled = true;
  selectedIndex = 0;
  galleryUrl: any = environment.galleryURL;

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
    console.log(content)
    this.loader.show();
    this.learnerService.getcourseGallery('io').subscribe((data)=>{
      if(data.data['search']['message']['courseDetail']) {
        this.coursedata = data.data['search']['message']['courseDetail']
        // if(content == 0){
        // this.coursedata.forEach((data1)=>{
        //   data1.children.forEach((data2) => {
        //     data2.allContent = [...data2.Image,...data2.Video]
        //   });
        // })
        // }
        this.coursedata.forEach(element1 => {
          element1.children[0].activeTopic = 'active'
        });
        this.loader.hide();
        console.log(this.coursedata)
      }
      else {
        this.loader.hide();
        this.emptyGallery = true;
      }
    })
  }

  onTopicSelection(moduleName,topicname) {
    this.coursedata.forEach((data1)=>{
      if(data1.title == moduleName) {
        data1.children.forEach((data2)=>{
          data2.activeTopic = ''
          if(data2.title == topicname) {
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

  onPreviewgallery(type,path1,path2) {
    var file;
    if(type == 'video' || type == 'image'){
      file = this.galleryUrl + '/'  + path1  + path2
    } else{
      file = this.galleryUrl + '/'  + path2
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
