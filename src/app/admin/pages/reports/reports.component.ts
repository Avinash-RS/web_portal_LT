import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { MatTableDataSource } from '@angular/material/table';

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
  reportDetails: Report[] = [];
  displayedColumns: string[] = ['slNo', 'report_id', 'total_count', 'success_count', 'updated_count', 'failure_count',
    'duplicate_count', 'existing_count', 'time_ago', 'link'];
  dataSource = new MatTableDataSource<Report>(this.reportDetails);

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
          }
          console.log(this.reportDetails);
          this.dataSource = new MatTableDataSource<Report>(this.reportDetails);
        }
      });
  }

  downloadDoc(url) {
    window.location.href = url;
  }
}
