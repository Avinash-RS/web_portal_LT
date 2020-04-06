import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service'
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-learner-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.scss']
})
export class LearnerHomeComponent implements OnInit {

  tiles: any = [];
  userDetailes: any;
  panelOpenState = false;
  state$: any;
  breakpoint: number;

  constructor(public service: LearnerServicesService, private router: Router, private gs: GlobalServiceService,
    private loader: Ng4LoadingSpinnerService, public activatedRoute: ActivatedRoute) { 
    }
  ngOnInit() {
      this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
      this.userDetailes =JSON.parse(localStorage.getItem('UserDetails')) || null;
  }
  myCourses() {

  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }
}
