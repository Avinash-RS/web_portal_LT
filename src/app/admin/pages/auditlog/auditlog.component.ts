import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { json } from 'd3';

@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.component.html',
  styleUrls: ['./auditlog.component.css']
})
export class AuditlogComponent implements OnInit {
  columns: any;
  displayedColumns: any;
  reports: any;
  dataSource = new MatTableDataSource<any>();
  today = new Date();
  viewdetail: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.reports =[{
      // "_id" : ObjectId("5ed1c64184817d1bf4e8f9b0"),
      api_call_request : [
        [
          {
            catalogue_id : "959c4yk51",
            course_id : [
              "09xmm9jn"
            ],
            select_all : true
          }
        ]
      ],
      api_call_response : [
        {
          response : {
            user_id: "1234ab",
            username : "lxpadmin"
          },
          category_response : {
            success : true,
            message : "courses unmapped from catalogue successfully"
          }
        }
      ],
      created_by : "admin",
      created_on : "2020-05-29T14:25:35.574+05:30",
      updated_on : "2020-05-29T14:25:35.574+05:30",
      is_active : true,
      api_request_url : "/unmapcoursesfromcatalogue",
      api_call_event : "Courses unmapping from Category",
      module_name : "Course Module",
      _v: 0,
      admin_id : "1234ab",
      admin_username : "lxpadmin"
    }]
    console.log(this.reports)
    this.columns = [
      { columnDef: 'module_name', header: 'Module', cell: (element: any) => `${element.module_name}` },
      { columnDef: 'api_call_event', header: 'Description', cell: (element: any) => `${element.api_call_event}` },
      { columnDef: 'created_on', header: 'Created date', cell: (element: any) => `${moment(element.created_on).format('LL')}` },
      { columnDef: 'updated_on', header: 'Updated date', cell: (element: any) => `${moment(element.updated_on).format('LL')}` },
      { columnDef: 'admin_username', header: 'Created by', cell: (element: any) => `${element.admin_username}` },
    ];
    this.displayedColumns = (['sno']).concat(this.columns.map(c => c.columnDef));
    this.displayedColumns = this.displayedColumns.concat(['action']);

    this.dataSource.data = this.reports;

  }

  openviewdialog(data, templateRef) {
    this.dialog.open(templateRef);
    this.viewdetail = data;
  }
  closedialogbox(){
    this.dialog.closeAll();
  }
}
