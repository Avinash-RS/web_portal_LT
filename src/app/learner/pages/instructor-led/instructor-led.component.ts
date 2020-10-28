import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LearnerServicesService } from '../../services/learner-services.service';

@Component({
  selector: 'app-instructor-led',
  templateUrl: './instructor-led.component.html',
  styleUrls: ['./instructor-led.component.css', '../coursedetails/coursedetails.component.scss']
})
export class InstructorLedComponent implements OnInit {

  sessionAttendance: any;
  listOfSessions: any;
  course: any;

  constructor(private router: Router,
    private learnerService: LearnerServicesService) {
    this.course = (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.detail);
    // console.log(detail);
  }

  ngOnInit() {
    this.getAttendance();
    this.getSessionsList();
    console.log(this.course);
    console.log(this.router.getCurrentNavigation());
  }

  getBack() {
    console.log('ggg');
    this.router.navigateByUrl('/Learner/MyCourse');
  }

  getAttendance() { // Http Call
    this.sessionAttendance = [{
      session: '1',
      topic: 'Matrix Algebra',
      date: new Date(),
      isPresent: true
    }, {
      session: '2',
      topic: 'Explainations of Mathemetical Functions',
      date: new Date(),
      isPresent: true
    }, {
      session: '3',
      topic: 'Fourier Series',
      date: new Date(),
      isPresent: false
    }, {
      session: '4',
      topic: 'Advanced Design of Reinforced Concrete Building',
      date: new Date(),
      isPresent: true
    }];
  }

  async getDiff(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    console.log('minutes', minutes);
    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }
    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;
    return difference;
  }

  getSessionsList() { // Http Call
    this.learnerService.getActivityDetailsByCourseAndBatchID('443222669025448', 'tbiwys0m').subscribe( async res => {
      debugger
      console.log(res);
      this.listOfSessions = res.data['get_course_activities_by_id']['data'];
      for (const los of this.listOfSessions) {
        los.duration = await this.getDiff(los.endDate, los.startDate);
      }
      console.log(this.listOfSessions);
    });

    // this.listOfSessions = [{
    //   name: 'Quality Planing',
    //   status: 'Upcoming',
    //   startedAt: new Date(),
    //   duration: '1 hour',
    //   img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    // }, {
    //   name: 'Analysis and Reporting',
    //   status: 'Upcoming',
    //   startedAt: new Date(),
    //   duration: '1 hour',
    //   img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    // }, {
    //   name: 'Best Marketing Analytics Courses in 2020',
    //   status: 'Upcoming',
    //   startedAt: new Date(),
    //   duration: '1 hour',
    //   img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    // }, {
    //   name: 'Online Course on Python Version 2020',
    //   status: 'Completed',
    //   startedAt: new Date(),
    //   duration: '1 hour',
    //   img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    // }, {
    //   name: 'Medical Courses in India After 12th',
    //   status: 'Completed',
    //   startedAt: new Date(),
    //   duration: '1 hour',
    //   img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    // }];
  }
}
