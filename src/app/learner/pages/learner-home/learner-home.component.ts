import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '../../services/learner-services.service'
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/common/services/handlers/global-service.service';

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
    if (this.gs.checkLogout()) {
      this.userDetailes = this.gs.checkLogout()
      console.log('hi',this.userDetailes)
    }
   
  }
  myCourses() {

  }

}
