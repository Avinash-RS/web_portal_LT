import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-learner-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.scss']
})
export class LearnerHomeComponent implements OnInit {
  tiles: any = [];
  userDetailes: any;
  constructor(public service: LearnerServicesService,private router:Router,) { }

  ngOnInit() {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    console.log('hi',this.userDetailes)
  }
  myCourses() {

  }

}
