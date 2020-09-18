import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';


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
  notificationMarkRead = [];
  offsetVal: number;
  pagevent: Event;


  constructor(public commonservice: CommonServicesService, public Lservice: LearnerServicesService) { }

  ngOnInit() {
    const learnerDetail = JSON.parse(localStorage.getItem('UserDetails'));
    this.userId = learnerDetail.user_id;
    this.viewAllnotifications();
  }
  viewAllnotifications() {
  this.commonservice.getAllNotifications(this.userId, 'learner', this.pagenumber).subscribe((result: any) => {
    this.notifications = result.data.getAllNotifications.data;
    this.totalCount = result.data.getAllNotifications.totalCount;
    this.dataSource = this.notifications;
  });
}
markAsRead(notification, type) {
  if (type === 'single') {
  this.notificationMarkRead.push(notification._id);
  } else if (type === 'all') {
  this.notifications.forEach(element => {
    this.notificationMarkRead.push(element._id);
  });
}
  this.Lservice.markAsRead(this.notificationMarkRead).subscribe((result: any) => {
    if (result.data.markAsRead.success === true) {
      this.viewAllnotifications();
    }
  });
}
next(e) {
  this.pagenumber = e.pageIndex + 1;
  this.viewAllnotifications();
}

}
