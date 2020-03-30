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

  constructor(public service: LearnerServicesService, private router: Router, private gs: GlobalServiceService,
    private loader: Ng4LoadingSpinnerService, public activatedRoute: ActivatedRoute) { 
      console.log(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.hello); }

  ngOnInit() {
    // if (this.gs.checkLogout()) {
    //   this.userDetailes = this.gs.checkLogout()
    //   console.log('hi',this.userDetailes)
    // }
    this.userDetailes = JSON.parse(localStorage.getItem('UserDetails')) || null;
    // console.log(this.router.getCurrentNavigation().extras.state.hello);
    this.state$ = this.activatedRoute.paramMap
      .pipe(filter(e => e instanceof NavigationStart),
        map(() => this.router.getCurrentNavigation().extras.state.hello)
      )
    console.log(this.state$)
  }
  myCourses() {

  }

}
