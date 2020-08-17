import { Component, OnInit } from '@angular/core';
import { LearnerServicesService } from '@learner/services/learner-services.service'
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-learner-dashboard',
  templateUrl: './learner-dashboard.component.html',
  styleUrls: ['./learner-dashboard.component.scss']
})
export class LearnerDashboardComponent implements OnInit {
  userDetailes: any;
  dashboardData: any;
  constructor(
    public translate: TranslateService,
    public service: LearnerServicesService,
    private gs: GlobalServiceService,
    private router: Router,
    private loader: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.userDetailes = this.gs.checkLogout();
    this.getLearnerDashboard()
  }

  getLearnerDashboard() {
    if (this.userDetailes.group_id)
    this.service.get_learner_dashboard(this.userDetailes.user_id).subscribe((response: any) => {
      if (response.data.getlearnerdashboarddetails && response.data.getlearnerdashboarddetails.success) {
        this.dashboardData = response.data.getlearnerdashboarddetails.data;
      }
    });
  }

  gotohome() {
    this.router.navigate(['/Learner/home']);
  }

}
