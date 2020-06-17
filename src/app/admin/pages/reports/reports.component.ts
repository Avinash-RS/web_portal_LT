import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface Report {
  slNo: number;
  total_count: number;
  success_count: number;
  updated_count: number;
  duplicate_count: number;
  existing_count: number;
  failure_count: number;
  time_ago: string;
  link: string;
  report_id: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  reportDetails: Report[] = [];
  displayedColumns: string[] = ['slNo', 'report_id', 'total_count', 'success_count', 'updated_count', 'failure_count',
    'duplicate_count', 'existing_count', 'time_ago', 'link'];
  dataSource = new MatTableDataSource<Report>(this.reportDetails);
  
  window: any;

  constructor(private service: AdminServicesService, private gs: GlobalServiceService, ) { }

  ngOnInit() {
    const admin = this.gs.checkLogout();
    this.service.getNotificationData(admin._id)
      .subscribe((result: any) => {
        if (result.data && result.data.getnotificationreports?.message) {
          this.reportDetails = result.data.getnotificationreports?.message || [];
          if (this.reportDetails.length === 0) {
            let det;
            det = JSON.parse(localStorage.getItem('Reports'));
            this.reportDetails = det;
            this.dataSource = new MatTableDataSource<Report>(this.reportDetails);
            this.dataSource.sort = this.sort;
          }
          this.dataSource = new MatTableDataSource<Report>(this.reportDetails);
          this.dataSource.sort = this.sort;
        }
      });
  }

  ngAfterViewInit() {
    // tslint:disable-next-line:only-arrow-functions
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data: Report, filter: string): boolean {
      return data?.report_id?.toLowerCase().includes(filter) ;
      // || data?.total_count?.toLowerCase().includes(filter) ||
      //   data?.success_count().includes(filter) || data?.updated_count?.toLowerCase().includes(filter) ;
    };
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      if (!data[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      return '2' + data[sortHeaderId].toLocaleLowerCase();
    };
  }

  downloadDoc(url) {
    window.location.href = url;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as unknown as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
