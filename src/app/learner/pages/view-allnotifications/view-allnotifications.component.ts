import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';


export interface PeriodicElement {
  notificationName: string;
  date: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {notificationName: 'Enrolled to marketing course', date: 'a day ago', symbol: 'Icon'},
  {notificationName: 'Enrolled to marketing course', date: '1 day ago', symbol: 'Icon'},
  {notificationName: 'Enrolled to marketing course', date: '2 days ago', symbol: 'Icon'},
  {notificationName: 'Enrolled to marketing course', date: '3 days ago', symbol: 'Icon'},
  {notificationName: 'Enrolled to marketing course', date: '5 days ago', symbol: 'Icon'},
  {notificationName: 'Enrolled to marketing course', date: '9 days ago', symbol: 'Icon'},
  {notificationName: 'Enrolled to marketing course', date: '10 days ago', symbol: 'Icon'}
];
@Component({
  selector: 'app-view-allnotifications',
  templateUrl: './view-allnotifications.component.html',
  styleUrls: ['./view-allnotifications.component.scss']
})
export class ViewAllnotificationsComponent implements OnInit {
  displayedColumns: string[] = ['notificationName', 'date', 'symbol'];
  dataSource = ELEMENT_DATA;
  limit = 10;
  userId: any;
  pagenumber = 1;
  notifications: any;
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
    console.log('notification', this.notifications);
  });
}

}
