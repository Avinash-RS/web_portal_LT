import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service'
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-learner-dashboard',
  templateUrl: './learner-dashboard.component.html',
  styleUrls: ['./learner-dashboard.component.scss']
})
export class LearnerDashboardComponent implements OnInit {
  userDetailes: any;
  dashboardData: void;

  constructor(
    public service: LearnerServicesService,
    private gs: GlobalServiceService,
    private loader: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.userDetailes = this.gs.checkLogout();
    console.log(this.userDetailes)
    this.getLearnerDashboard()
  }
  
  getLearnerDashboard(){
    if (this.userDetailes.group_id)
    this.service.get_learner_dashboard(this.userDetailes.user_id).subscribe((response: any) => {
      if (response.data.getlearnerdashboarddetails && response.data.getlearnerdashboarddetails.success) {
        this.dashboardData = response.data.getlearnerdashboarddetails.data;
        console.log('dashboard response', this.dashboardData);
      }
  
    });
  }

}
