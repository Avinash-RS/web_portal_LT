import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { knowledgeService } from '@learner/services/knowledge-resource/knowledge-resource.service';

@Component({
  selector: 'app-knowledge-resource-home',
  templateUrl: './knowledge-resource-home.component.html',
  styleUrls: ['./knowledge-resource-home.component.scss']
})
export class KnowledgeResourceHomeComponent implements OnInit {
  details: any;
  fileValidations = {
    'Knowledge Check': /(\.csv)$/i,
  };
  imageView: File;
  sampleFileLink = 'https://edutechstorage.blob.core.windows.net/container1/resource/739113684616842-Sample-file.csv'
  @ViewChild('fileInput3') fileInput3;


  constructor(public apiService: knowledgeService,
    private router: Router) { }

  ngOnInit() {
    this.getResourceFiles();
  }

  getResourceFiles() {
    this.apiService.getResourceDetails().subscribe((result: any) => {
      let resultData = result.data.get_all_resources_details.message &&
        result.data.get_all_resources_details.message.length > 0 ? result.data.get_all_resources_details.message : [];
      let tempDetails = resultData.reduce((r, a) => {
        r[a.domain] = [...r[a.domain] || [], a];
        return r;
      }, {});
      tempDetails = Object.entries(tempDetails);
      tempDetails.forEach((dt) => {
        dt[2] = false
      }) 
      this.details = tempDetails;
    })
  }

  onFileDropped(fileInput: any) {
      const formData = new FormData();
      formData.append('resource', fileInput[0]);
      this.apiService.uploadResourceDetail(formData).subscribe((result:any) => {
        console.log(result);
        if(result.Code == 200){
          const knowledgeDetails = {
            file:'https://edutechstorage.blob.core.windows.net/' + result.Result.path,
            documentname:result.Result.originalname,
            createdby_role:"",
            createdby_name:"",
            createdby_id:""
          }
          console.log("knoedateil",knowledgeDetails)
          this.apiService.saveResourceData(knowledgeDetails).subscribe(data=>{
              console.log(data,"1111111111");
          })
        }
    });
  }

onSelectFile(fileInput){
  if (fileInput && fileInput.target && fileInput.target.files && fileInput.target.files[0]) {
      // var allowedExtensions;
      // var filePath = fileInput.target.files[0].name;
      this.imageView = fileInput.target.files[0];
      const formData = new FormData();
      formData.append('resource', this.imageView);
      this.apiService.uploadResourceDetail(formData).subscribe((result: any) => {
    console.log('result',result);

    if(result.Code == 200){
      const knowledgeDetails = {
        file:'https://edutechstorage.blob.core.windows.net/' + result.Result.path,
        documentname:result.Result.originalname,
        createdby_role:"",
        createdby_name:"",
        createdby_id:""
      }
      this.apiService.saveResourceData(knowledgeDetails).subscribe(data=>{
          console.log(data,"1111111111");
      })
    }

});
  }
}

  onResourcePreview(resource) {
    this.router.navigate(['/Learner/knowledge/preview'],
      {
        queryParams: {
          domain: resource.domain,
          area_of_interest: resource.area_of_interest,
          _id: resource._id
        }
      });
  }

}
