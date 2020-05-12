import { Component, OnInit } from '@angular/core';
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
        console.log(this.queryData)
      }
    });
  }


  navChooseTemp() {

    this.router.navigate(['/Admin/auth/Wca/choosetemplate'], { queryParams: { viewingModule: this.queryData.viewingModule, courseName: this.queryData.courseName, image: this.queryData.image } });

  }

  navViewModule() {
    this.router.navigate(['/Admin/auth/Wca/viewmodule'], { queryParams: { viewingModule: this.queryData.viewingModule, image: this.queryData.image, courseName: this.queryData.courseName } });
  }

  uploadDoc(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let that = this;
    that.isFileContent = false;
    fileReader.onloadend = function (x) {
      that.isFileContent = String(fileReader.result).includes("imsmanifest.xml") ? true : false;
      if (!that.isFileContent) {
        that.toast.warning('Kindly upload a valid zip file');
      }
      else {

      }
    }
    fileReader.readAsText(file);
  }


}

