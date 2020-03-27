import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service'
import { Router } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';

@Component({
  selector: 'app-learner-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.scss']
})
export class LearnerHomeComponent implements OnInit {
  tiles: any = [];
  userDetailes: any;
  panelOpenState = false;
  
  constructor(public service: LearnerServicesService,private router:Router,private gs: GlobalServiceService,) { }

  ngOnInit() {
    // if (this.gs.checkLogout()) {
    //   this.userDetailes = this.gs.checkLogout()
    //   console.log('hi',this.userDetailes)
    // }
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
  }
  myCourses() {

  }

}
