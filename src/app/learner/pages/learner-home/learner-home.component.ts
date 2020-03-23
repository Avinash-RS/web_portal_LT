import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service'

@Component({
  selector: 'app-learner-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.scss']
})
export class LearnerHomeComponent implements OnInit {
  tiles: any = [];
  userDetailes: any;
  constructor(public service: LearnerServicesService) { }

  ngOnInit() {
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;

  
  }
  myCourses() {

  }

}
