import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { id } from '@swimlane/ngx-charts/release/utils';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { debug } from 'util';


@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  queryData: any;
  courseDetails: any;
  routedCourseDetails: any;
  noOfModules: number = 0;
  hoverName: string;
  isHover: boolean;
  isDrag: boolean;
  isRepo = 'false';
  moduleList = [];
  constructor(public spinner: NgxSpinnerService,
    public toast: ToastrService, private router: Router, public route: ActivatedRoute, public apiService: WcaService) { }

  ngOnInit() {

    this.resetList()

    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
        this.queryData = params;
        this.isRepo = (this.queryData.isRepo == 'true') ? 'true' : 'false'
        this.routedCourseDetails = {
          courseId: params.courseId,
          courseImage: params.courseImage,
          courseName: params.courseName,
        }
      }
    });


    this.route.snapshot.paramMap.get('courseDetails');
    // this.queryData = 1
    if (this.routedCourseDetails.courseId) {
      this.getCourseDetails();
    }
  }


  items2: any[]

  done = [


  ];

  resetList() {

    // setTimeout(() => {
    if (this.courseDetails && this.courseDetails.coursedetails) {
      this.courseDetails.coursedetails = this.courseDetails.coursedetails.slice();
    }
    // }, 0);    
  }

  drop(event: CdkDragDrop<string[]>) {
    //this.isDrag = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.courseDetails.coursedetails.push(this.courseDetails.coursedetails[event.previousIndex]);

      // transferArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
    }
  }


  getCourseDetails() {
    //this.spinner.show();
    this.moduleList = [];
    this.apiService.getCourseDetails(this.routedCourseDetails.courseId).subscribe((data: any) => {
      this.courseDetails = data.Result[0];
      if (this.isRepo == 'true') {
        this.getRepoModules();
        this.isRepo = 'false';
      }
      else {
        this.updateModList();
        this.updateCourseDetails();
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

  updateModList() {
    this.courseDetails.coursedetails.forEach((data) => {
      if (data.moduleid) {
        this.moduleList.push(data.moduleid)
      }
    })
  }

  updateCourseDetails() {
    this.noOfModules = 0;
    if (this.courseDetails && this.courseDetails.coursedetails.length) {
      this.courseDetails.coursedetails.forEach((data) => {
        if (data.modulestatus !== 'false') {
          ++this.noOfModules;
        }
      });
    }
  }

  addToRepo(idx) {
    this.courseDetails.flag = "false";
    let count = 0;
    let modDetails;
 
    this.courseDetails.coursedetails.forEach((data) => {
      if (idx == count) {
        modDetails = data;
        modDetails.coursedetails = []
        modDetails.coursename = this.courseDetails.coursename;
      }
      ++count;
    });

    this.apiService.postRepoModules(modDetails).subscribe((res: any) => {
      if(res.Code == 200) {
        this.moduleList.push(res.Result);
        this.toast.success("Module added to repository successfully")
      }
    });
    
  }

  deleteModule(idx) {
    this.courseDetails.flag = "false";
    let count = 0;
    this.courseDetails.coursedetails.forEach((data) => {
      if (idx == count) {
        data.modulestatus = "false";
      }
      ++count;
    });
    this.updateCourseDetails();
  }

  onCreate() {
    if (this.courseDetails.coursetype !== 'SCORM') {
      this.spinner.show();
      this.apiService.createDraft(this.courseDetails).subscribe((res: any) => {
        if (res.Code == 200) {
          this.getCourseDetails();
          const obj = {
            course_id: this.routedCourseDetails.courseId,
            is_active: 0
          }
          this.apiService.updateCourse(obj).subscribe((data: any) => {
          });
          this.toast.success('Module updated successfully');
          // this.router.navigate(['/Admin/auth/Wca']);
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      })
    }
  }

  addTopic(value, index) {
    this.apiService.bSubject1.next({ index: index, courseDetails: this.courseDetails });
    this.router.navigate(['/Admin/auth/Wca/addtopic'], { queryParams: { edit: true, viewingModule: this.courseDetails.courseid, courseName: this.courseDetails.coursename, image: this.routedCourseDetails.courseImage } });
  }

  navChooseTemp() {
    if (this.courseDetails.coursetype !== 'SCORM') {
      this.router.navigate(['/Admin/auth/Wca/choosetemplate'], { queryParams: { addModule: true, viewingModule: this.courseDetails.courseid, courseName: this.courseDetails.coursename, image: this.routedCourseDetails.courseImage } });
    }
    else {
      this.toast.warning("SCORM course cannot be edited")
    }
  }

  addModuleRepos() {
    if (this.courseDetails.coursetype !== 'SCORM') {

      this.router.navigate(['/Admin/auth/Wca/modulerepository'], { queryParams: { viewingModule: this.routedCourseDetails.courseId, courseName: this.routedCourseDetails.courseName, image: this.routedCourseDetails.courseImage, moduleList: this.moduleList } });
    }
    else {
      this.toast.warning("SCORM course cannot be edited")
    }
  }

  crsDetails() {
    this.router.navigate(['/Admin/auth/Wca/addcourse'], { queryParams: { edit: true, viewingModule: this.courseDetails.courseid } });
  }

  onhoverLeave() {
    this.isHover = false;
    this.hoverName = '';
  }

  onHover(n) {
    this.isHover = true;
    this.hoverName = n;
  }
  onRefernceBtnClick() {
    this.router.navigate(['/Admin/auth/Wca/rf']);
  }

  editResource() {
    this.router.navigate(['/Admin/auth/Wca/rf']);
  }

  getRepoModules() {
    this.apiService.repositoryModules().subscribe((data: any) => {
      let moduleList = data.Result;
      moduleList.forEach((val) => {
        if (val.moduleid == this.queryData.selectedModule) {
          let mod = {
            moduleid: val.moduleid,
            modulename: val.modulename,
            moduledetails: val.moduledetails,
            modulestatus: 'true',
            template_details: val.template_details
          }
          this.courseDetails.coursedetails.push(mod);
        }
      })
      this.updateCourseDetails();
      this.updateModList();
    })
  }
}
