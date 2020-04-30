import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { WcaService } from '../../services/wca.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
export interface PeriodicElement {
  type_name: string;
  module: string;
  topic: string;
  type: string;
  dateAdded:string;
}
@Component({
  selector: 'app-reference-file',
  templateUrl: './reference-file.component.html',
  styleUrls: ['./reference-file.component.scss']
})
export class ReferenceFileComponent implements OnInit {
  myDate = new Date(Date.now());
  referenceLinkForm: FormGroup;
  @ViewChild (MatPaginator) paginator: MatPaginator;
  ELEMENT_DATA: PeriodicElement[] = [];
  moduleList: any;
  topicList: any;
  referenceName: string;
  selectedOption: string;
  referenceLink: string;
  uploadMsg: string;
  displayedColumns: string[] = ['type_name', 'module_id', 'topic_id', 'type', 'created_on', 'Action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild (MatSort) sort: MatSort;
  getdocData: any;
  currentUser: any;
  selectfile: File;
  content: any;
  modulemenu: any = [];
  topicmenu: void;
  pagenumber :number = 1;
  moduleListData:any;
  modulenamelist:any;
  topicListData:any;
  topicnamelist:any;
  count: any;
  constructor(public service: WcaService,public route: Router,  public learnerservice: LearnerServicesService, public fb: FormBuilder, private alert: AlertServiceService,) { 
    console.log(this.myDate)
  }

  ngOnInit() {
    this.get_module_topic()
    this.dataSource.sort = this.sort;
    this.getAllRefDoc(0);
    this.getModuleData();
  
     this.dataSource.paginator = this.paginator;
     console.log(this.dataSource)
    var user = localStorage.getItem('UserDetails')
    this.currentUser = JSON.parse(user);
    this.selectedOption = 'document';
    this.referenceLink = "http://";
    this.uploadMsg = "Upload the document"
    this.referenceLinkForm = this.fb.group({
      name:  new FormControl(''),
      module:  new FormControl(''),
      topic:  new FormControl(''),

    })
  }


  getModuleData() {
    this.learnerservice.getModuleData(1).subscribe(data => {
      console.log(data)
      // if(data.data['getmoduleData']['success'] == true){
        this.modulemenu = data.data['getmoduleData']['data'][0]
        this.topicmenu = this.modulemenu.coursedetails[0];
      // }else{
        // this.alert.openAlert('Something went wrong please try after sometime',null)
      // } 
    })
  }

  uploadDoc(event){
    this.selectfile = <File>event.target.files[0];
    const fb = new FormData();
    fb.append('reffile', this.selectfile)
    let tempData: any = fb.get("reffile");
    if((tempData.size/1000) > 10240){
      this.uploadMsg = "Upload the document";
    }    
    else {
      this.uploadMsg = tempData.name;
      console.log(this.uploadMsg,'this.uploadMsg')
    }
  }

  saveReferenceFile() {
    var payload = new FormData();
    if(this.selectfile){
        payload.append('reffile', this.selectfile, this.selectfile.name);
        payload.append('path', this.referenceLink + 'www');
    }else{
      console.log('fil..........',this.referenceLink);
      payload.append('path', this.referenceLink);
    }
   
    payload.append("module_id", this.referenceLinkForm.value.module.modulename);
    payload.append('topic_id', this.referenceLinkForm.value.topic);
   
    payload.append("user_id",this.currentUser.user_id);
    payload.append('type', this.selectedOption);
    payload.append('type_name', this.referenceName);
    payload.append('created_on', this.myDate.toString());
    
    this.service.refDocUpload(payload).subscribe(data => {
      console.log(data)
      if(data['success'] == true){
        this.alert.openAlert(data['message'],null)
        this.referenceLinkForm.reset();
        this.clear();
        this.getAllRefDoc(0)
      }else{
        this.alert.openAlert(data['message'],null)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

removeDoc(recordID){
  this.alert.openConfirmAlert('Confirmation', 'Are you sure you want to remove the record ?').then((data: Boolean) => {
          if (data === true) {
              this.service.remove_doc_ref(recordID._id).subscribe(data => {
                if(data.data['remove_doc_ref']['success'] === 'true'){
                  this.alert.openAlert(data.data['remove_doc_ref']['message'],null)
                  this.getAllRefDoc(0)
                } else {
                  this.alert.openAlert('Please try after sometime',null)
                }
              })
            } 
  });
}

getAllRefDoc(pagenumber){
  if (pagenumber == 0)
  this.ELEMENT_DATA = []
  this.service.getallrefdoc(pagenumber).subscribe(data => {
    this.getdocData = data.data['getallrefdoc']['data'];
    this.count = data.data['getallrefdoc']['count'];
   Array.prototype.push.apply(this.ELEMENT_DATA, this.getdocData);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

next(e) {
  this.getAllRefDoc(e.pageIndex)
}

clear(){
  this.referenceLink = '';
  this.referenceName = '';
  this.uploadMsg = "Upload the document";
  this.referenceLink = "http://";
}
//get module name
get_module_topic(){
  this.learnerservice.get_module_topic().subscribe(data => {
     if(data['data']['get_module_topic'].success){
       this.moduleListData=data['data']
       console.log( this.moduleListData)
       this.modulenamelist=this.moduleListData.get_module_topic.data
       console.log(this.modulenamelist)
  }
  })
}
gettopicdetail(){
  console.log(this.referenceLinkForm.value)
  this.learnerservice.gettopicdetail(this.referenceLinkForm.value.module._id,this.referenceLinkForm.value.module.modulename).subscribe(data => {
    if(data['data']['gettopicdetail'].success){
      this.topicListData=data['data']
      this.topicnamelist=this.topicListData.gettopicdetail.data
      console.log(this.topicnamelist)
    }
  })
}

back(){
  this.route.navigateByUrl('/Admin/auth/Wca/previewcourse');
}
}
