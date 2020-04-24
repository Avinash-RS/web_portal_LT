import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort ,MatPaginator} from '@angular/material';
import { WcaService } from '../../services/wca.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
export interface PeriodicElement {
  name: string;
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
  displayedColumns: string[] = ['name', 'module', 'topic', 'type', 'dateAdded', 'Action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild (MatSort) sort: MatSort;
  getdocData: any;
  currentUser: any;

  constructor(public service: WcaService, public fb: FormBuilder, private alert: AlertServiceService,) { 
    console.log(this.myDate)
  }

  ngOnInit() {
    this.getAllRefDoc(1);
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    var user = localStorage.getItem('UserDetails')
    this.currentUser = JSON.parse(user);
    this.selectedOption = 'document';
    this.referenceLink = "http://";
    this.uploadMsg = "Upload the document"
    this.referenceLinkForm = this.fb.group({
      name:  new FormControl(''),
      module:  new FormControl(''),
      topic:  new FormControl(''),
      // referenceLink: new FormControl(''),
      // referenceName: new FormControl(''),
      // selectedOptions: new FormControl(''),

    })
    this.moduleList = [
      {
        id:1,
        name:"module name01"
      },
      {
        id:2,
        name:"module name02"
      }
    ]

    this.topicList = [
      {
        id:11,
        name:"topic name01"
      },
      {
        id:12,
        name:"topic name02"
      }
    ]

  }

  uploadDoc(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f));
    let tempData: any = formData.get("file");
    console.log(tempData)
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
    console.log(this.referenceLinkForm)
    payload.append("module_id", this.referenceLinkForm.value.module);
    payload.append('topic_id', this.referenceLinkForm.value.topic);
    payload.append('path', this.referenceLink);
    payload.append("user_id",this.currentUser.user_id);
    payload.append('reffile', this.uploadMsg);
    payload.append('type', this.selectedOption);
    payload.append('type_name', this.referenceName);
    payload.append('created_on', this.myDate.toString());
    
    this.service.refDocUpload(payload).subscribe(data => {
      if(data['success'] == true){
        this.alert.openAlert(data['message'],null)
        this.getAllRefDoc(1)
      }else{
        this.alert.openAlert('Somethink went wrong Please try again',null)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
removeDoc(data){
  this.service.remove_doc_ref(data._id).subscribe(data => {
    if(data.data['remove_doc_ref']['success'] == true){
      this.alert.openAlert(data.data['remove_doc_ref']['message'],null)
      this.getAllRefDoc(1)
    } else {
      this.alert.openAlert(data.data['remove_doc_ref']['message'],null)
      this.getAllRefDoc(1)
    }
  })
}
getAllRefDoc(pagenumber){
  console.log(pagenumber)
  // var pagenumber = 1
  this.service.getallrefdoc(1).subscribe(data => {
    this.getdocData = data.data['getallrefdoc']['data']
    Array.prototype.push.apply(this.ELEMENT_DATA, this.getdocData);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}

next(e) {
  console.log(e)
  this.getAllRefDoc(e.pageIndex)
}
}
