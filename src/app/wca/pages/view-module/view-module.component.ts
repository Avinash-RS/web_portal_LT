import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WcaService } from '../../services/wca.service';
import { error } from 'util';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit {
  queryData: any;
  courseDetails: any;
  isFileContent = false;
  scormPath: string = '';
  @ViewChild('file') fileUploaded;
  userDetails: any;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private wcaService: WcaService,
    public toast: ToastrService

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let flag = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          flag = 1;
        }
      }
      if (flag) {
        this.queryData = params;
      }
    });
    this.userDetails = JSON.parse(localStorage.getItem('adminDetails'))
  }


  navChooseTemp() {

    this.router.navigate(['/Admin/auth/Wca/choosetemplate'], { queryParams: { viewingModule: this.queryData.viewingModule, courseName: this.queryData.courseName, image: this.queryData.image } });

  }

  navViewModule() {
    this.router.navigate(['/Admin/auth/Wca/viewmodule'], { queryParams: { viewingModule: this.queryData.viewingModule, image: this.queryData.image, courseName: this.queryData.courseName } });
  }

  navModuleRepository() {
    this.router.navigate(['/Admin/auth/Wca/modulerepository'], { queryParams: { viewingModule: this.queryData.viewingModule, image: this.queryData.image, courseName: this.queryData.courseName } });
  }

  onUploadDoc(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let that = this;
    that.isFileContent = false;
    fileReader.onloadend = function (x) {
      that.isFileContent = String(fileReader.result).includes("imsmanifest.xml") ? true : false;
      if (!that.isFileContent) {
        that.fileUploaded.nativeElement.value = '';
        that.toast.warning('Kindly upload a valid zip file');
      }
      else {
        that.uploadDoc(file);
      }
    }
    fileReader.readAsText(file);
  }

  uploadDoc(file) {
    let scormCourse = file;
    const formData = new FormData();
    formData.append('scrom', scormCourse);
    this.wcaService.uploadScromCourse(formData).subscribe((data: any) => {
      this.scormPath = 'https://edutechstorage.blob.core.windows.net/' + data.Result.path;
    }, error => {
      this.scormPath = '';
      this.fileUploaded.nativeElement.value = '';
      this.toast.warning('oops someting went wrong. Try again!!!')
    })
  }

  onCreate() {
    let data = {
      "coursename": this.queryData.courseName,
      "coursefile": this.scormPath,
      "coursestatus": "true",
      "courseid": this.queryData.viewingModule,
      "coursetype": "SCORM",
      "coursedetails": [],
      "createdby_name": this.userDetails.username,
      "createdby_id": this.userDetails.user_id,
      "createdby_role": localStorage.getItem('role')
    }

    this.wcaService.createDraft(data).subscribe((res: any) => {
      if (res.Code == 200) {
        this.router.navigate(['/Admin/auth/Wca']);
      }
    })
  }

}

