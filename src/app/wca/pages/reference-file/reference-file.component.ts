import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { WcaService } from '@wca/services/wca.service';
//import { LearnerServicesService } from '@wc';
@Component({
  selector: 'app-reference-file',
  templateUrl: './reference-file.component.html',
  styleUrls: ['./reference-file.component.scss']
})
export class ReferenceFileComponent implements OnInit {

  //referenceFileList: any;
  referenceFileList = [{
    name: "Data Science",
    module: "Module-01",
    topic: "topic_1",
    type: " Reference_application",
    dateAdded: "Apr 30, 2020 at 12.30 pm"
  }]
  moduleList: any;
  topicList: any;
  referenceName: string;
  selectedOption: string;
  referenceLink: string;
  uploadMsg: string;
  displayedColumns: string[] = ['name', 'module', 'topic', 'type', 'dateAdded', 'Action'];
  dataSource = new MatTableDataSource(this.referenceFileList);
  @ViewChild(MatSort) sort: MatSort;

  constructor(public service: WcaService) { 
    this.getAllRefDoc()
  }

  ngOnInit() {
   
    this.selectedOption = 'document';
    this.referenceLink = "http://";
this.uploadMsg = "Upload the document"
    this.getTableData();
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

  getTableData() {

  }

  deleteReferenceFile(data) {
    debugger
  }


  uploadDoc(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f));
    let tempData: any = formData.get("file");
    if((tempData.size/1000) > 10240){
      this.uploadMsg = "Upload the document";
    }
    else {
      this.uploadMsg = tempData.name;
    }
  }

  saveReferenceFile() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
removeDoc(){
  this.service.remove_doc_ref('5ea1598d5c7d4f34181511e3').subscribe(data => {

  })
}
getAllRefDoc(){
  this.service.getallrefdoc().subscribe(data => {
    console.log(data)
  })
}
}
