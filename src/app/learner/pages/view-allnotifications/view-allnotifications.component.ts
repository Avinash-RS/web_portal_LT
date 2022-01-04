import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { TranslateService } from '@ngx-translate/core';
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
  emptynotifications = false;

  constructor(private router: Router, public commonservice: CommonServicesService, public Lservice: LearnerServicesService,public translate: TranslateService
              ) { 
                let lang = localStorage.getItem('language')
                this.translate.use(lang ? lang : 'en')
               }

  ngOnInit() {
    const learnerDetail = JSON.parse(localStorage.getItem('UserDetails'));
    this.userId = learnerDetail.user_id;
    this.viewAllnotifications();
  }
  viewAllnotifications() {
    this.commonservice.getAllNotifications(this.userId, 'learner', this.pagenumber).subscribe((result: any) => {
    this.notifications = result.data.getAllNotifications.data;
    if (this.notifications.length > 0) {
      this.emptynotifications = false;
    } else {
      this.emptynotifications = true;
    }
    this.totalCount = result.data.getAllNotifications.totalCount;
    this.unreadCount = result.data.getAllNotifications.unReadCount;
    this.dataSource = this.notifications;
    const unreadCount = this.unreadCount;
    this.commonservice.notificationCount$.next(unreadCount);
    this.commonservice.notificationStatus$.next(this.notifications);
  });
}
markAsRead(notification, type) {
  this.notificationMarkRead = [];
  if (type === 'single') {
    if(!notification.notifiedStatus) {
      this.notificationMarkRead.push(notification._id);
    }
  } else if (type === 'all') {
  this.notifications.forEach(element => {
    if(!element.notifiedStatus) { 
      this.notificationMarkRead.push(element._id);
    }
    
  });
}
if (this.notificationMarkRead.length > 0) {
  this.Lservice.markAsRead(this.notificationMarkRead, this.userId).subscribe((result: any) => {
    if (result.data.markAsRead.success === true) {
      this.viewAllnotifications();
    }
  });
}
}
next(e) {
  this.pagenumber = e.pageIndex + 1;
  this.viewAllnotifications();
}
goBack() {
  this.router.navigateByUrl('/Learner/MyCourse');
}
}
