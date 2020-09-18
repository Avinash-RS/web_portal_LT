import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {
  userId: any;
  notifications = [];
  pagenumber = 1;
  notificationMarkRead = [];
  unreadCount: any;
  constructor(public commonservice: CommonServicesService, public Lservice: LearnerServicesService ,
              public router: Router) { }

  ngOnInit() {
    const learnerDetail = JSON.parse(localStorage.getItem('UserDetails'));
    this.userId = learnerDetail.user_id;
    this.getNotification();
  }

  markAsRead(notification) {
    this.notificationMarkRead.push(notification._id);
    this.Lservice.markAsRead(this.notificationMarkRead).subscribe((result: any) => {
      if (result.data.markAsRead.success === true) {
        this.getNotification();
      }
    });
  }
  // removeNotification(id) {
  //       this.notifications = this.notifications.filter((data) => data._id !== id);
  // }

  getNotification() {
    this.commonservice.getAllNotifications(this.userId, 'learner', this.pagenumber).subscribe((result: any) => {
      this.notifications = result.data.getAllNotifications.data;
      this.unreadCount = result.data.getAllNotifications.unReadCount;
    });
  }
  viewall() {
    this.router.navigate(['/Learner/viewAllnotifications']);
  }
}
