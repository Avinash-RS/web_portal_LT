import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';


export interface PeriodicElement {
  notificationName: string;
  date: string;
  symbol: string;
}

@Component({
  selector: 'app-view-allnotifications',
  templateUrl: './view-allnotifications.component.html',
  styleUrls: ['./view-allnotifications.component.scss']
})
export class ViewAllnotificationsComponent implements OnInit {
  notifications: any;
  displayedColumns: string[] = ['notificationName', 'date', 'symbol'];
  dataSource = this.notifications;
  limit = 10;
  userId: any;
  pagenumber = 1;
  totalCount: any;
  constructor(public commonservice: CommonServicesService) { }

  ngOnInit() {
    const learnerDetail = JSON.parse(localStorage.getItem('UserDetails'));
    this.userId = learnerDetail.user_id;
    this.viewAllnotifications();
  }
  viewAllnotifications() {
  this.commonservice.getAllNotifications(this.userId, 'learner', this.pagenumber).subscribe((result: any) => {
    console.log('notification data', result.data.getAllNotifications.data);
    this.notifications = result.data.getAllNotifications.data;
    this.totalCount = result.data.getAllNotifications.totalCount;
    console.log('notification', this.notifications);
    this.dataSource = this.notifications;
  });
}
readNotification() {
  console.log('read');
}

}
