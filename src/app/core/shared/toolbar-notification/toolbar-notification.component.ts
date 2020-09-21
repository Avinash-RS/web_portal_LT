import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {
  isOpen = false;
  userId: any;
  notifications = [];
  pagenumber = 1;
  notificationMarkRead = [];
  unreadCount: any;

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
  constructor(public commonservice: CommonServicesService, public Lservice: LearnerServicesService ,
              public router: Router, private elementRef: ElementRef) { }

  ngOnInit() {
    this.commonservice.notificationCount.subscribe((data: any) => {
      this.unreadCount = data;
  });
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

  getNotification() {
    this.commonservice.getAllNotifications(this.userId, 'learner', this.pagenumber).subscribe((result: any) => {
      this.notifications = result.data.getAllNotifications.data;
      this.unreadCount = result.data.getAllNotifications.unReadCount;
    });
  }
  viewall() {
    this.isOpen = false;
    this.router.navigate(['/Learner/viewAllnotifications']);
  }
}
