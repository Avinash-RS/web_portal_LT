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
  markasread: any;
  constructor(public commonservice: CommonServicesService, public Lservice: LearnerServicesService ,
              public router: Router) { }

  ngOnInit() {
    const learnerDetail = JSON.parse(localStorage.getItem('UserDetails'));
    this.userId = learnerDetail.user_id;
    this.commonservice.getAllNotifications(this.userId, 'learner').subscribe((result: any) => {
      this.notifications = result.data.getAllNotifications.data;
    });
  }

  markAsRead(notification) {
    this.notificationMarkRead.push(notification._id);
    this.Lservice.markAsRead(this.notificationMarkRead).subscribe((result: any) => {
      if (result.data.markAsRead) {
        this.markasread = result.data.markAsRead.success;
      }
    });
  }
  removeNotification(id) {
    // this.commonservice.removeNotificationData(reportId).subscribe((result: any) => {
    //   if (result.data.update_notification.success === true) {
        this.notifications = this.notifications.filter((data) => data._id !== id);
    //   }
    // });
  }
  viewall() {
    this.router.navigate(['/Learner/viewAllnotifications']);
  }
}
