import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['notificationName', 'date', 'symbol'];
  limit = 10;
  userId: any;
  pagenumber = 1;
  totalCount: any;
  notificationMarkRead = [];
  unreadCount: any;


  constructor(public commonservice: CommonServicesService, public Lservice: LearnerServicesService,
              private loader: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    const learnerDetail = JSON.parse(sessionStorage.getItem('UserDetails'));
    this.userId = learnerDetail.user_id;
    this.viewAllnotifications();
  }
  viewAllnotifications() {
    this.loader.show();
    this.commonservice.getAllNotifications(this.userId, 'learner', this.pagenumber).subscribe((result: any) => {
    this.notifications = result.data.getAllNotifications.data;
    this.totalCount = result.data.getAllNotifications.totalCount;
    this.unreadCount = result.data.getAllNotifications.unReadCount;
    this.dataSource = this.notifications;
    this.loader.hide();
    const unreadCount = this.unreadCount;
    this.commonservice.notificationCount$.next(unreadCount);
    this.commonservice.notificationStatus$.next(this.notifications);
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
