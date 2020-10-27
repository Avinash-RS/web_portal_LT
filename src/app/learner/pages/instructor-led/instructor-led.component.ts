import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructor-led',
  templateUrl: './instructor-led.component.html',
  styleUrls: ['./instructor-led.component.css', '../coursedetails/coursedetails.component.scss']
})
export class InstructorLedComponent implements OnInit {

  sessionAttendance: any;
  listOfSessions: any;
  course: any;

  constructor(private router: Router) {
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

  getSessionsList() { // Http Call
    this.listOfSessions = [{
      name: 'Quality Planing',
      status: 'Upcoming',
      startedAt: new Date(),
      duration: '1 hour',
      img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    }, {
      name: 'Analysis and Reporting',
      status: 'Upcoming',
      startedAt: new Date(),
      duration: '1 hour',
      img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    }, {
      name: 'Best Marketing Analytics Courses in 2020',
      status: 'Upcoming',
      startedAt: new Date(),
      duration: '1 hour',
      img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    }, {
      name: 'Online Course on Python Version 2020',
      status: 'Completed',
      startedAt: new Date(),
      duration: '1 hour',
      img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    }, {
      name: 'Medical Courses in India After 12th',
      status: 'Completed',
      startedAt: new Date(),
      duration: '1 hour',
      img: 'https://www.edureka.co/blog/wp-content/uploads/2017/01/What-is-Data-Science-A-2.png'
    }];
  }
}
