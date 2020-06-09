import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WcaService } from '../../services/wca.service';
import { ToastrService } from 'ngx-toastr';
import { id } from '@swimlane/ngx-charts/release/utils';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { debug } from 'util';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';


@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  queryData: any;
  courseDetails: any;
  routedCourseDetails: any;
  noOfModules = 0;
  hoverName: string;
  isHover: boolean;
  isDrag: boolean;
  isRepo = 'false';
  moduleList = [];
  isFileContent = false;
  @ViewChild('file') fileUploaded;
  scormPath = '';
  isScrom: boolean;
  isCreate: boolean;
  breakpoint: any;
  spinner = false;
  constructor(
    private alertService: AlertServiceService,
    public toast: ToastrService,
    private router: Router,
    public route: ActivatedRoute,
    public apiService: WcaService) { }

  ngOnInit() {

    this.resetList();
    this.spinner = true;
    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
        this.queryData = params;
        this.isCreate = params.isCreate && params.isCreate == 'true' ? true : false;
        this.isRepo = (this.queryData.isRepo === 'true') ? 'true' : 'false';
        this.routedCourseDetails = {
          courseId: params.courseId,
          courseImage: params.courseImage,
          courseName: params.courseName,
        }
        console.log(this.queryData)
        // added by ankit 
        localStorage.setItem('courseid',this.routedCourseDetails.courseId)
      }
    });
    this.route.snapshot.paramMap.get('courseDetails');
    // this.queryData = 1
    if (this.routedCourseDetails.courseId) {
      this.getCourseDetails();
      if (this.isCreate) {
        this.isCreate = false;
        setTimeout(() => {
          // debugger
          this.getCourseDetails();
        }, 5000);
      }
    }
  }

  resetList() {

    // setTimeout(() => {
    if (this.courseDetails && this.courseDetails.coursedetails) {
      this.courseDetails.coursedetails = this.courseDetails.coursedetails.slice();
    }
    // }, 0);
  }

  drop(event: CdkDragDrop<string[]>) {
    // this.isDrag = false;
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
    this.moduleList = [];
    this.apiService.getCourseDetails(this.routedCourseDetails.courseId).subscribe((data: any) => {
      this.courseDetails = data.Result[0];
      this.isScrom = this.courseDetails && this.courseDetails.coursetype == "SCORM" ? true : false;
      if (this.isRepo === 'true') {
        this.getRepoModules();
        this.isRepo = 'false';
      } else {
        this.updateModList();
        this.updateCourseDetails();
      }

      this.spinner = false;
    }, err => {
      this.spinner = false;
    });
  }

  updateModList() {
    this.courseDetails.coursedetails.forEach((data) => {
      if (data.moduleid && data.modulestatus == 'true') {
        this.moduleList.push(data.moduleid);
      }
    });
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

  onUploadDoc(fileList: FileList): void {
    const file = fileList[0];
    const fileReader: FileReader = new FileReader();
    const that = this;
    that.isFileContent = false;
    // tslint:disable-next-line:only-arrow-functions
    fileReader.onloadend = function (x) {
      that.isFileContent = String(fileReader.result).includes('imsmanifest.xml') ? true : false;
      if (!that.isFileContent) {
        that.fileUploaded.nativeElement.value = '';
        that.toast.warning('Kindly upload a valid zip file');
      } else {
        that.uploadDoc(file);
      }
    };
    fileReader.readAsText(file);
  }

  uploadDoc(file) {
    const scormCourse = file;
    const formData = new FormData();
    formData.append('scrom', scormCourse);
    this.apiService.uploadScromCourse(formData).subscribe((data: any) => {
      this.isScrom = true;
      this.scormPath = 'https://edutechstorage.blob.core.windows.net/' + data.Result.path;
    }, error => {
      this.scormPath = '';
      this.isScrom = false;
      this.fileUploaded.nativeElement.value = '';
      this.toast.warning('oops someting went wrong. Try again!!!');
    });
  }

  addToRepo(idx, module) {
    if (!module.moduleid || module.moduleid.length == 0) {
      this.alertService.openConfirmAlert('Are you sure you want to add module to the repository', '').then((data: Boolean) => {
        if (data) {
          this.courseDetails.flag = 'false';
          let count = 0;
          let cnt = 0;
          let modDetails;

          // tslint:disable-next-line:no-shadowed-variable
          this.courseDetails.coursedetails.forEach((data: any) => {
            if (idx === count) {
              modDetails = data;
              modDetails.coursedetails = [];
              modDetails.courseid = this.courseDetails.courseid;
              modDetails.coursename = this.courseDetails.coursename;
            }
            ++count;
          });

          this.apiService.postRepoModules(modDetails).subscribe((res: any) => {
            if (res.Code === 200) {
              this.moduleList.push(res.Result);
              this.courseDetails.coursedetails.forEach((data: any) => {
                if (idx === cnt) {
                  data.moduleid = res.Result;
                }
                ++cnt;
              })
              this.toast.success('Module added to repository successfully');
            }
          });
        }
      });
    }
  }
  deleteScromFile(e) {
    event.stopPropagation();
    this.alertService.openConfirmAlert('Are you sure you want to delete it', '').then((data: Boolean) => {
      if (data) {
        this.scormPath = '';
        this.isScrom = false;
        this.courseDetails.coursetype = '';
        this.courseDetails.coursefile = '';

        this.spinner = true;
        this.apiService.createDraft(this.courseDetails).subscribe((res: any) => {
          if (res.Code === 200) {
            this.getCourseDetails();
            const obj = {
              course_id: this.routedCourseDetails.courseId,
              is_active: 0
            };
            this.apiService.updateCourse(obj).subscribe((data: any) => {
            });
          }
          this.spinner = false;
        }, err => {
          this.spinner = false;
        });
      }
    });
  }

  deleteModule(idx) {
    // tslint:disable-next-line:ban-types
    this.alertService.openConfirmAlert('Are you sure you want to delete it', '').then((data: Boolean) => {
      if (data) {
        this.courseDetails.flag = 'false';
        let count = 0;
        // tslint:disable-next-line:no-shadowed-variable
        this.courseDetails.coursedetails.forEach((data: any) => {
          if (idx === count) {
            data.modulestatus = 'false';
          }
          ++count;
        });
        this.updateCourseDetails();
      }
    });
  }

  onCreate() {
    if (this.scormPath.length === 0) {
      this.spinner = true;
      this.courseDetails.coursefile = ""
      this.apiService.createDraft(this.courseDetails).subscribe((res: any) => {
        if (res.Code === 200) {
          this.getCourseDetails();
          const obj = {
            course_id: this.routedCourseDetails.courseId,
            is_active: 0
          };
          this.apiService.updateCourse(obj).subscribe((data: any) => {
          });
          this.toast.success('Module updated successfully');
          this.router.navigate(['/Admin/auth/Wca']);
        }
        this.spinner = false;
      }, err => {
        this.spinner = false;
      });
    } else if (this.scormPath.length > 0) {
      this.spinner = true;
      this.courseDetails.coursetype = 'SCORM';
      this.courseDetails.coursefile = this.scormPath;
      this.apiService.createDraft(this.courseDetails).subscribe((res: any) => {
        if (res.Code === 200) {
          this.getCourseDetails();
          const obj = {
            course_id: this.routedCourseDetails.courseId,
            is_active: 0
          };
          this.apiService.updateCourse(obj).subscribe((data: any) => {
          });
          this.toast.success('Module updated successfully');
          this.router.navigate(['/Admin/auth/Wca']);
        }
        this.spinner = false;
      }, err => {
        this.spinner = false;
      });
    }
  }

  addTopic(value, index) {
    this.apiService.bSubject1.next({ index, courseDetails: this.courseDetails });
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/Admin/auth/Wca/addtopic'], { queryParams: { edit: true, viewingModule: this.courseDetails.courseid, courseName: this.courseDetails.coursename, image: this.routedCourseDetails.courseImage } });
  }

  navChooseTemp() {
    if (!this.courseDetails) {
      this.router.navigate(['/Admin/auth/Wca/choosetemplate'],
        {
          queryParams: {
            addModule: true,
            viewingModule: this.routedCourseDetails.courseId,
            courseName: this.routedCourseDetails.courseName,
            image: this.routedCourseDetails.courseImage
          }
        });
    }
    else if (this.courseDetails.coursetype !== 'SCORM' && this.scormPath.length === 0) {
      // tslint:disable-next-line:max-line-length
      this.router.navigate(['/Admin/auth/Wca/choosetemplate'], { queryParams: { addModule: true, viewingModule: this.courseDetails.courseid, courseName: this.courseDetails.coursename, image: this.routedCourseDetails.courseImage } });
    } else {
      // this.toast.warning('SCORM course cannot be edited');
    }
  }

  addModuleRepos() {
    if (!this.courseDetails) {
      this.router.navigate(['/Admin/auth/Wca/modulerepository'], {
        queryParams:
        {
          viewingModule: this.routedCourseDetails.courseId,
          courseName: this.routedCourseDetails.courseName,
          image: this.routedCourseDetails.courseImage,
          moduleList: this.moduleList
        }
      });
    }
    else if (this.courseDetails && this.courseDetails.coursetype !== 'SCORM' && this.scormPath.length === 0) {

      // tslint:disable-next-line:max-line-length
      this.router.navigate(['/Admin/auth/Wca/modulerepository'], { queryParams: { viewingModule: this.routedCourseDetails.courseId, courseName: this.routedCourseDetails.courseName, image: this.routedCourseDetails.courseImage, moduleList: this.moduleList } });
    } else {
      // this.toast.warning('SCORM course cannot be edited');
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
    this.router.navigate(['/Admin/auth/Wca/rf'],{queryParams:{id:this.routedCourseDetails.courseId}});
  }

  editResource() {
    this.router.navigate(['/Admin/auth/Wca/rf'],{queryParams:{id:this.routedCourseDetails.courseId}});
  }

  getRepoModules() {
    this.apiService.repositoryModules().subscribe((data: any) => {
      const moduleList = data.Result;
      moduleList.forEach((val) => {
        this.queryData.selectedModule.forEach((selectedModuleId) => {
          let isInvalid = false;
          this.courseDetails.coursedetails.forEach((cModId) => {
            if (cModId.moduleid == val.moduleid) {
              cModId.modulestatus = 'true';
              isInvalid = true;
            }
          })
          if (!isInvalid) {
            if (val.moduleid === selectedModuleId) {
              const mod = {
                moduleid: val.moduleid,
                modulename: val.modulename,
                moduledetails: val.moduledetails,
                modulestatus: 'true',
                template_details: val.template_details
              };

              this.courseDetails.coursedetails.push(mod);
            }
          }
        })

      });
      this.updateCourseDetails();
      this.updateModList();
    });
  }
}
