import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {
  isOpen = false;
  userId: any;
  notifications: any;
  pagenumber = 1;
  notificationMarkRead = [];
  unreadCount: any;
  cssPrefix: any;
  routedSubs: any;

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
      this.commonservice.openNotification$.next(this.isOpen);
    }
  }
  constructor(public commonservice: CommonServicesService, public Lservice: LearnerServicesService ,
              public router: Router, private elementRef: ElementRef) {
                const learnerDetail = JSON.parse(localStorage.getItem('UserDetails'));
                this.userId = learnerDetail?.user_id;
                if(!this.userId) {
                  this.router.navigate(['/Learner/login']);
                  return;
                }
                this.routedSubs = this.router.events.pipe(
                  filter(event => event instanceof NavigationEnd),
                ).subscribe((e: any) => {
                  
                  const urlHeader = e.url.split("/")
                  const headerPages = 'MyCourse';
                  if (urlHeader[2] == headerPages) {
                    this.getNotification();
                  }else{
                    this.unreadCount = JSON.parse(localStorage.getItem('NotificationCount'));
                  }
                });

               }
  ngOnInit() {
    this.commonservice.notificationCount.subscribe((data: any) => {
      this.unreadCount = data;
  });
    this.commonservice.notificationStatus.subscribe((status: any) => {
      this.notifications = status;
}); 
  }

  getNotification() {
    this.commonservice.getAllNotifications(this.userId, 'learner', this.pagenumber).subscribe((result: any) => {
      if (result && result.data && result.data.getAllNotifications) {
      this.notifications = result.data.getAllNotifications.data;
      this.unreadCount = result.data.getAllNotifications.unReadCount;
      localStorage.setItem('NotificationCount',this.unreadCount)
      }
    });
  }


notificationOpen(data) {
      this.isOpen = data;
      this.commonservice.openNotification$.next(this.isOpen);
    }

  markAsRead(notification) {
    this.notificationMarkRead.push(notification._id);
    this.Lservice.markAsRead(this.notificationMarkRead,this.userId).subscribe((result: any) => {
      if (result.data.markAsRead.success === true) {
        this.getNotification();
      }
    });
  }

  viewall() {
    this.isOpen = false;
    this.router.navigate(['/Learner/viewAllnotifications']);
  }
  ngOnDestroy(){
    if(this.routedSubs) {
      this.routedSubs.unsubscribe();
    }
  }
}
