import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnerDashboardComponent } from './learner-dashboard.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatProgressBar} from '@angular/material';
import { LearnerServicesService } from '@learner/services/learner-services.service'
describe('LearnerDashboardComponent', () => {
  let component: LearnerDashboardComponent;
  let fixture: ComponentFixture<LearnerDashboardComponent>;
  let dashboardData = require("assets/mockdata/admin/admin_dashboard.json");
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressBar,
        HttpClientModule,
        ApolloModule,
        RouterModule.forRoot([]),
        HttpLinkModule],
      declarations: [ LearnerDashboardComponent ],
      providers: [
        { provide: LearnerServicesService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check get dashboard data', () => {
    component.getLearnerDashboard();
    expect(component.dashboardData).toBe(dashboardData.data.getlearnerdashboarddetails.data);
  })

});
