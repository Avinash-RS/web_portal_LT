import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { knowledgeService } from '@learner/services/knowledge-resource/knowledge-resource.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-knowledge-resource-home',
  templateUrl: './knowledge-resource-home.component.html',
  styleUrls: ['./knowledge-resource-home.component.scss']
})
export class KnowledgeResourceHomeComponent implements OnInit {
  details = [];
  isLoadBalanced;
  isReloaded = false;
  fileValidations = {
    'Knowledge Check': /(\.csv)$/i,
  };
  imageView: File;
  searchDetails = '';
  dummyText = 1;
  showSkeleton = true;
  userDetailes;
  sampleFileLink = 'https://edutechstorage.blob.core.windows.net/container1/resource/739113684616842-Sample-file.csv';
  @ViewChild('fileInput3') fileInput3;
  @ViewChild('ResourceData') searchedData: ElementRef;
  tempDetailsList = [];

  constructor(public apiService: knowledgeService,
              public toast: ToastrService,
              private CommonService: CommonServicesService,
              private router: Router, private gs: GlobalServiceService,
              public translate: TranslateService) {
                const lang = localStorage.getItem('language');
                this.translate.use(lang ? lang : 'en');
                this.userDetailes = this.gs.checkLogout();
                if (!this.userDetailes?.is_password_updated) {
                  this.router.navigate(['/Learner/profile']);
                }
              }

  ngOnInit() {
    this.getResourceFiles();
  }

  getResourceFiles() {
    this.showSkeleton = true;
    this.tempDetailsList = [];
    this.apiService.getResourceDetails().subscribe((result: any) => {
      const resultData = result.data.get_all_resources_details.message &&
      result.data.get_all_resources_details.message.length > 0 ? result.data.get_all_resources_details.message : [];
      let tempDetails = resultData.reduce((r, a) => {
        r[a.domain] = [...r[a.domain] || [], a];
        return r;
      }, {});
      tempDetails = Object.entries(tempDetails);
      tempDetails.forEach((dt) => {
        const subTempDetails = dt[1].reduce((r, a) => {
          r[a.area_of_interest] = [...r[a.area_of_interest] || [], a];
          return r;
        }, {});
        dt[1] = Object.entries(subTempDetails);
      });
      tempDetails.forEach((d) => {
        const b = {
          domain: '',
          areaOfInterest: [],
          isMore: false
        };
        b.domain = d[0];
        d[1].forEach((areaOfInt) => {
          b.areaOfInterest.push(areaOfInt[0]);
        });
        this.tempDetailsList.push(b);
      });
      this.details = this.tempDetailsList;
      this.showSkeleton = false;
      console.log(this.details);
      this.checkKnowledgeRec();
    });
  }
  checkKnowledgeRec() {
    setTimeout(() => {
      if (this.searchedData) {
        this.isLoadBalanced = false;
      } else {
        this.isLoadBalanced = true;
      }
    });
  }
  onFileDropped(fileInput: any) {
    this.CommonService.loader$.next(true);
    const formData = new FormData();
    formData.append('resource', fileInput[0]);
    this.apiService.uploadResourceDetail(formData).subscribe((result: any) => {

      if (result.Code === 200) {
        const knowledgeDetails = {
          documentname: result.Result.originalname,
          file: 'https://edutechstorage.blob.core.windows.net/' + result.Result.path,
          createdby_role: '',
          createdby_name: '',
          createdby_id: ''
        };
        this.apiService.saveResourceData(knowledgeDetails).subscribe((results: any) => {
          if (results.data.save_resource_data.success === true) {
            this.toast.success('Resource file upload successfully !!!');
          } else if (results.data.save_resource_data.error_msg === 'Not Success') {
            this.toast.warning('Please upload file having extensions - .xls or .xlsx or .csv !!!');
          }
        });
      }
    });
  }

  onSelectFile(fileInput) {
    this.CommonService.loader$.next(true);
    if (fileInput && fileInput.target && fileInput.target.files && fileInput.target.files[0]) {
      this.imageView = fileInput.target.files[0];
      const formData = new FormData();
      formData.append('resource', this.imageView);
      this.apiService.uploadResourceDetail(formData).subscribe((result: any) => {

        if (result.Code === 200) {
          const knowledgeDetails = {
            file: 'https://edutechstorage.blob.core.windows.net/' + result.Result.path,
            documentname: result.Result.originalname,
            createdby_role: '',
            createdby_name: '',
            createdby_id: ''
          };

          this.apiService.saveResourceData(knowledgeDetails).subscribe((results: any) => {
            if (results.data.save_resource_data.success === true) {
              this.toast.success('Resource upload successfully !!!');
            } else if (results.data.save_resource_data.error_msg === 'Not Success') {
              this.toast.warning('Please upload file having extensions .xls or .xlsx or .csv !!!');
            }
          });
        }
      });
    }
  }

  onResourcePreview(domains, areaOfInterest) {
    this.router.navigate(['/Learner/knowledge/preview'],
      {
        queryParams: {
          domain: domains,
          area_of_interest: areaOfInterest
        }
      });
  }

  onTabChanged(event) {
    if (event.index === 0) {
      this.getResourceFiles();
    }

  }

}
