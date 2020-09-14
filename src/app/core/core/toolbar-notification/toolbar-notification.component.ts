import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';


@Component({
  selector: 'app-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {
  userId: any;
  notifications = [];
  constructor(public commonservice: CommonServicesService) { }

  ngOnInit() {
    const learnerDetail = JSON.parse(localStorage.getItem('UserDetails'));
    this.userId = learnerDetail.user_id;
    this.commonservice.getAllNotifications(this.userId, 'learner').subscribe((result: any) => {
      console.log('notification data', result.data.getAllNotifications.data);
      this.notifications = result.data.getAllNotifications.data;
    });
  }

  
  removeNotification(id) {
    // this.commonservice.removeNotificationData(reportId).subscribe((result: any) => {
    //   if (result.data.update_notification.success === true) {
        this.notifications = this.notifications.filter((data) => data._id !== id);
    //   }
    // });
  }
}
