import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service';
import * as moment from 'moment';
@Component({
  selector: 'app-learner-calendar',
  templateUrl: './learner-calendar.component.html',
  styleUrls: ['./learner-calendar.component.css']
})
export class LearnerCalendarComponent implements OnInit {
  public UserDetails: any;
  public tokenDetails: any;
  public tokenid: any;
  public user_id: any;
  public selectedDate: any;
  public learnerActivityList = [];
  public setColor: any;
  public setDottedColor: any;
  public setDuration: any;
  public activitystarttime: any;
  public activityendtime: any;
  public errorMessage: any;
  public showErrorCard: any;
  public selectedMoment = new Date();
  selectedToday;
  bsInlineValue = new Date();

  constructor(private service: LearnerServicesService) {}

  ngOnInit() {
    this.UserDetails =
      JSON.parse(localStorage.getItem('UserDetails')) ||
      JSON.parse(sessionStorage.getItem('UserDetails')) ||
      null;

    this.tokenDetails = localStorage.getItem('token');

    this.user_id = this.UserDetails.user_id;
    // this.tokenid = this.tokenDetails.token;
    this.selectedDate = moment().format();
    this.getLearnerActivity(this.selectedDate);
  }

  getDateChangedValue(event) {
    // var formattedDate = moment(event).format();
    // this.selectedDate = new Date(event).toUTCString();
    // this.selectedDate = moment.utc(event).format();
    this.selectedDate = new Date(
      Date.UTC(
        event.getUTCFullYear(),
        event.getUTCMonth(),
        event.getUTCDate(),
        event.getUTCHours(),
        event.getUTCMinutes(),
        event.getUTCSeconds()
      )
    ).toISOString();

    console.log(this.selectedDate);
    this.getLearnerActivity(this.selectedDate);
  }
  getLearnerActivity(selectedDate) {
    const selectedDatediff = new Date(selectedDate);
    if (this.bsInlineValue.getDate() === selectedDatediff.getDate()) {
      this.selectedToday = true;
    } else {
      this.selectedToday = false;
    }
    this.service.getReadLeanerActivity(this.user_id, selectedDate).subscribe(
      (res: any) => {
        if (res.data?.get_read_learner_activity?.message.length > 0) {
          this.showErrorCard = false;
          this.learnerActivityList =
            res.data?.get_read_learner_activity?.message;
          if (this.selectedToday) {
            this.learnerActivityList.forEach((element, index) => {
              if (index === 0) {
                element.activity_details.ongoing = 'true';
              } else {
                element.activity_details.ongoing = 'false';
              }
            });
          }
        } else {
          this.errorMessage = res.data?.get_read_learner_activity?.error_msg;
          this.showErrorCard = true;
          this.learnerActivityList = [];
        }
      },
      err => {}
    );
  }
}
