import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { AdminServicesService } from '@admin/services/admin-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.component.html',
  styleUrls: ['./auditlog.component.scss']
})
export class AuditlogComponent implements OnInit {
  reports: any;
  dataSource = new MatTableDataSource<any>();
  today = new Date();
  viewdetail: any;
  requiredfield = false;
  enablefield = true;
  resultsLength: any;
  columns = [
    { columnDef: 'module_name', header: 'Module', cell: (element: any) => `${element.module_name}` },
    // { columnDef: 'api_call_event', header: 'Description', cell: (element: any) => `${element.api_call_event}` },
    { columnDef: 'created_on', header: 'Created date', cell: (element: any) => `${ moment(element?.created_on).format('LLL') || ' '}` },
    { columnDef: 'updated_on', header: 'Updated date', cell: (element: any) => `${moment(element?.updated_on).format('LLL') || ' '}` },
    { columnDef: 'admin_username', header: 'Created by', cell: (element: any) => `${element?.admin_username || ' '}` },
  ];
  fromdate: any;
  todate: any;
  displayedColumns = (['sno']).concat(this.columns.map(c => c.columnDef));
  exportdata = 'exportall';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog, private adminservice: AdminServicesService) { }

  ngOnInit() {
    this.displayedColumns = this.displayedColumns.concat(['action']);
    this.getallauditreports('0');
    // this.reports =[{
    //   // "_id" : ObjectId("5ed1c64184817d1bf4e8f9b0"),
    //   api_call_request : [
    //     [
    //       {
    //         catalogue_id : "959c4yk51",
    //         course_id : [
    //           "09xmm9jn"
    //         ],
    //         select_all : true
    //       }
    //     ]
    //   ],
    //   api_call_response : [
    //     {
    //       response : {
    //         user_id: "1234ab",
    //         username : "lxpadmin"
    //       },
    //       category_response : {
    //         success : true,
    //         message : "courses unmapped from catalogue successfully"
    //       }
    //     }
    //   ],
    //   created_by : "admin",
    //   created_on : "2020-05-29T14:25:35.574+05:30",
    //   updated_on : "2020-05-29T14:25:35.574+05:30",
    //   is_active : true,
    //   api_request_url : "/unmapcoursesfromcatalogue",
    //   api_call_event : "Courses unmapping from Category",
    //   module_name : "Course Module",
    //   _v: 0,
    //   admin_id : "1234ab",
    //   admin_username : "lxpadmin"
    // }]
  }

  getallauditreports(pgnumber) {
    this.adminservice.getauditlogreports(pgnumber).subscribe((result: any) => {
      this.resultsLength = null;
      // console.log(result.message);
      if (result?.message) {
        this.reports = result.message;
        // this.reports.forEach(element => {
        //    const date = moment(element.created_on);
        //    const date1 = moment(element.updated_on);
        //    element.created_on = date.utc().format('MMMM Do YYYY, h:mm:ss a');
        //    element.updated_on = date1.utc().format('MMMM Do YYYY, h:mm:ss a');
        // });
        this.dataSource.data = this.reports;
        this.resultsLength = result?.total_count;
      }
    });
  }
  openviewdialog(data, templateRef) {
    this.dialog.open(templateRef, { disableClose: true });
    this.viewdetail = data;
  }
  closedialogbox() {
    this.dialog.closeAll();
  }
  datefield(fromdate) {
    if (fromdate) {
      this.enablefield = false;
    }
  }
  filter(filterform, pgnumber) {
    // this.requiredfield = true;
    if (filterform.valid) {
      // this.requiredfield = false;
      const data = {
        from_date: moment(filterform.value.fromdate).format('YYYY-MM-DD'),
        to_date: moment(filterform.value.todate).format('YYYY-MM-DD'),
        pagenumber: pgnumber
      };
      console.log(data);
      this.adminservice.getfilteredauditlog(data).subscribe((result: any) => {
        this.resultsLength = null;
        console.log(result.message);
        if (result?.success === true) {
          this.reports = result?.message;
          // this.reports.forEach(element => {
          //   const date = moment(element.created_on);
          //   const date1 = moment(element.updated_on);
          //   element.created_on = date.utc().format('MMMM Do YYYY, h:mm:ss a');
          //   element.updated_on = date1.utc().format('MMMM Do YYYY, h:mm:ss a');
          //  });
          this.dataSource.data = this.reports;
          this.resultsLength = result.total_count;
        } else {

        }

      });
    }
  }
  cancel(filterform) {
    filterform.resetForm();
    this.requiredfield = false;
    this.enablefield = true;
    this.getallauditreports('0');
  }
  export(filterform) {
    // this.requiredfield = false;
    if (filterform.valid) {
      const fromdate = moment(filterform.value.fromdate1).format('YYYY-MM-DD');
      const todate =  moment(filterform.value.todate1).format('YYYY-MM-DD');
      this.adminservice.getadminexportauditlog(fromdate, todate).subscribe((result: any) => {
        if (result?.data?.get_admin_export_auditlog?.success === true) {
          filterform.reset();
          window.open(result?.data?.get_admin_export_auditlog.message);
          this.dialog.closeAll();
        } else if (result?.data?.get_admin_export_auditlog?.message === 'Error in exporting data') {
          Swal.fire('Report not found');
        }
      });
    }
  }
  exportall() {
    const fromdate = 'undefined';
    const todate = 'undefined';
    this.adminservice.getadminexportauditlog(fromdate, todate).subscribe((result: any) => {
      if (result?.data?.get_admin_export_auditlog?.success === true) {
        window.open(result?.data?.get_admin_export_auditlog.message);
        this.dialog.closeAll();
      } else if (result?.data?.get_admin_export_auditlog?.message === 'Error in exporting data') {
        Swal.fire('Report not found');
      }
    });
  }
  next(e, filterform) {
    if (filterform.value.fromdate && filterform.value.todate) {
      this.filter(filterform, e.pageIndex.toString());
    } else {
      this.getallauditreports(e.pageIndex.toString());
    }
  }
  openexportdialog(templateRef) {
    this.dialog.open(templateRef , { disableClose: true });
  }
}
