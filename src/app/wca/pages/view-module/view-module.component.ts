import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WcaService } from '../../services/wca.service';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit {
  queryData: any;
  courseDetails: any;
  isFileContent = false;
  scormCourse: any;
  scormPath: string;
  @ViewChild('file') fileUploaded;
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
    this.scormCourse = '';
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
    this.scormCourse = file;
    const formData = new FormData();
    formData.append('file', this.scormCourse);
    this.wcaService.uploadScromCourse(formData).subscribe((data: any) => {
      this.scormPath = 'https://edutechstorage.blob.core.windows.net/' + data.path;
      debugger
    })
  }

}

