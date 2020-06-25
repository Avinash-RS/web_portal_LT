import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lxp-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {
  cssPrefix = 'toolbar-notification';
  isOpen = false;
  read = false;
  @Input() notifications = [];

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

  constructor(private elementRef: ElementRef, private adminService: AdminServicesService, private router: Router) { }

  ngOnInit() {
  }

  downloadDoc(url) {
    window.location.href = url;
  }

  select() { }

  removeNotification(reportId) {
    this.adminService.removeNotificationData(reportId).subscribe((result: any) => {
      if (result.data.update_notification.success === true) {
        this.notifications = this.notifications.filter((data) => data.report_id !== reportId);
      }
    });
  }

  moveToReport(value) {
    // this.router.navigateByUrl('/', {skipLocationChange: true})
    // .then(() => this.router.navigateByUrl('/Admin/auth/viewReport', { state: { type: value } }));
    // // this.router.navigateByUrl('/Admin/auth/viewReport', { state: { type: value } });
    // this.isOpen = false;
    if (value.request_type === 'bulk_enrolment') {
      this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigateByUrl('/Admin/auth/bulkenrolmentreports'));
      this.isOpen = false;
    } else if (value.request_type === 'bulk_user_upload') {
      this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigateByUrl('/Admin/auth/reports'));
      this.isOpen = false;
    }
  }
}
