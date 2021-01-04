import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { knowledgeService } from '@learner/services/knowledge-resource/knowledge-resource.service';
import { ToastrService } from 'ngx-toastr';
import { KnowledgePreviewComponent } from '../knowledge-preview/knowledge-preview.component';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-knowledge-landing-page',
  templateUrl: './knowledge-landing-page.component.html',
  styleUrls: ['./knowledge-landing-page.component.scss']
})
export class KnowledgeLandingPageComponent implements OnInit {
  @ViewChild(DragScrollComponent) ds: DragScrollComponent;
  resourceParams: any;
  topicList = [
    'All'
  ];

  TopicsOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    slideBy: 7,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right p-t-2"></i>'],
    responsive: {
      0: {
        items: 7
      },
      400: {
        items: 7
      },
      740: {
        items: 7
      },
      940: {
        items: 7
      }
    },
    nav: true
  };
  resourceFile = [];
  isPreview = false;
  preResourceFile: any;
  selectedTopic = 'All';
  leftNavDisabled = false;
  rightNavDisabled = false;
  constructor(public route: ActivatedRoute,
              public apiService: knowledgeService,
              public dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.resourceParams = {
        domain: params.domain,
        area_of_interest: params.area_of_interest
      };
      this.resourceDetails(params.domain, params.area_of_interest);
    });
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

  resourceDetails(domain, areaOfInterest) {
    const topics = [];
    this.apiService.getParticularResourceDetails(domain, areaOfInterest).subscribe((data: any) => {
      const tempDetails = data.data.get_all_resources_details.message.reduce((r, a) => {
        r[a.domain] = [...r[a.domain] || [], a];
        return r;
      }, {});
      this.resourceFile = Object.entries(tempDetails);
      this.resourceFile[0][1].forEach((d, i) => {
        const extIdx = d.url.search(/\.pdf|.mp4|.jpg|.mp3|.png|.jpeg/);
        if (extIdx >= 0) {
          d.fileType = d.url.substring(extIdx + 1, extIdx + 4);
        }
        if (d.fileType === 'jpe') {
          d.fileType = 'jpeg';
        }
        // let idx = d.file.search(/\d[-]/g) + 2;
        // d.fileName = idx > 0 ? d.file.substring(idx) : "";
        const isPushed = this.topicList.find(tpc => tpc === d.topic);
        if (!isPushed) {
          this.topicList.push(d.topic);
        }
      });
      this.preResourceFile = JSON.parse(JSON.stringify(this.resourceFile[0][1]));
      this.resourceFile = this.resourceFile[0][1];
    });
  }

  onPreview(resData) {
    this.isPreview = true;
    const file = resData.url;
    let height = '70%';
    let width = '55%';

    const fileType = (resData.fileType === 'jpg' || resData.fileType === 'png' || resData.fileType === 'jpeg')
      ? 'image' : (resData.fileType === 'mp3') ? 'audio' : resData.fileType === 'mp4' ? 'video' :
        resData.fileType === 'pdf' ? 'pdf' : 'invalid';
    if (fileType === 'invalid') {
      this.toastr.warning('Invalid file format to open');
      return false;
    }
    if (fileType === 'pdf') {
      height = '90%';
      width = '70%';
    }
    const dialogRef = this.dialog.open(KnowledgePreviewComponent, {
      data: {
        file,
        fileType,
        fileTypePrew: resData.fileType,
        filename: resData.filename
      },
      height,
      width,
      backdropClass: 'preview-popup-background',
      panelClass: 'knowledge-preview-popup',
      closeOnNavigation: true
    }).afterClosed().subscribe((res) => {
    });
  }

  onTopicSelection(name) {
    this.selectedTopic = name;
    if (name === 'All') {
      this.resourceFile = JSON.parse(JSON.stringify(this.preResourceFile));
      return true;
    }
    const data = [];
    this.preResourceFile.forEach((d) => {
      if (d.topic === name) {
        data.push(d);
      }
    });
    this.resourceFile = JSON.parse(JSON.stringify(data));
  }

}
