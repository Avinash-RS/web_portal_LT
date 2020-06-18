import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { AdminServicesService } from '@admin/services/admin-services.service';
import Swal from 'sweetalert2';
import { LocationStrategy } from '@angular/common';
import { MatSort } from '@angular/material/sort';

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
    { columnDef: 'created_on', header: 'Created date', cell: (element: any) => `${element?.created_on || ' '}` },
    { columnDef: 'updated_on', header: 'Updated date', cell: (element: any) => `${element?.updated_on || ' '}` },
    { columnDef: 'admin_username', header: 'Created by', cell: (element: any) => `${element?.admin_username || ' '}` },
  ];
  fromdate: any;
  todate: any;
  displayedColumns = (['sno']).concat(this.columns.map(c => c.columnDef));
  exportdata = 'exportall';
  filteredreports: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog, private adminservice: AdminServicesService, private locationStrategy: LocationStrategy) {
  }
  ngOnInit() {
    this.displayedColumns = this.displayedColumns.concat(['action']);
    this.getallauditreports('0');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data?.module_name?.toLowerCase().includes(filter) || data?.admin_username?.toLowerCase().includes(filter);
    };

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      if (!data[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      return '2' + data[sortHeaderId].toLocaleLowerCase();
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as unknown as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getallauditreports(pgnumber) {
    this.resultsLength = null;
    this.adminservice.getauditlogreports(pgnumber).subscribe((result: any) => {
      if (result?.message?.length) {
        result.message.forEach(element => {
          //  const date = moment(element.created_on);
          //  const date1 = moment(element.updated_on);
          //  element.created_on = date.utc().format('MMMM Do YYYY, h:mm:ss a');
          //  element.updated_on = date1.utc().format('MMMM Do YYYY, h:mm:ss a');
           element.created_on = moment(element?.created_on, 'YYYY-MM-DD HH:MM:SS').format('MMMM Do YYYY, hh:MM:SS a');
           element.updated_on = moment(element?.updated_on, 'YYYY-MM-DD HH:MM:SS').format('MMMM Do YYYY, hh:MM:SS a');
          });
        // console.log(pgnumber);
        if (pgnumber === '0') {
          this.reports = [];
        }
        Array.prototype.push.apply(this.reports, result.message);
        this.dataSource.data = this.reports;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = result?.total_count;
      }
    });
  }
  openviewdialog(data, templateRef) {
    this.dialog.open(templateRef);
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
    this.resultsLength = null;
    if (filterform.valid) {
      // this.requiredfield = false;
      const data = {
        from_date: moment(filterform.value.fromdate).format('YYYY-MM-DD'),
        to_date: moment(filterform.value.todate).format('YYYY-MM-DD'),
        pagenumber: pgnumber
      };
      this.adminservice.getfilteredauditlog(data).subscribe((result: any) => {
        if (result?.success === true) {
          // this.reports.forEach(element => {
          //   const date = moment(element.created_on);
          //   const date1 = moment(element.updated_on);
          //   element.created_on = date.utc().format('MMMM Do YYYY, h:mm:ss a');
          //   element.updated_on = date1.utc().format('MMMM Do YYYY, h:mm:ss a');
          //  });
          if (pgnumber === '0') {
            this.filteredreports = [];
          }
          Array.prototype.push.apply(this.filteredreports, result.message);
          this.dataSource.data = this.filteredreports;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
    this.dialog.open(templateRef);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.dialog) {
        this.dialog.closeAll();
    }
 }
}
