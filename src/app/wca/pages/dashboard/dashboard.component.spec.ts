import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { WcaService } from '../../services/wca.service';
import { MockWcaService } from '../../services/wca.mock.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardData = require("assets/mockdata/wca/dashboard.json");

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        MatRadioModule,
        MatDialogModule,
        MatTooltipModule,
        HttpClientModule,
        ApolloModule,
        RouterModule.forRoot([]),
        HttpLinkModule],
      declarations: [DashboardComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: WcaService, useClass: MockWcaService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check for the windows inner width above 992', () => {
    expect(component.breakpoint).toBe(4);
  })

  it('Check for resize width below 480', () => {
    let event = {
      target: {
        innerWidth: 400
      }
    }
    component.onResize(event);
    expect(component.breakpoint).toBe(1);
  })
  it('Check for the windows inner width between 480 and 768', () => {
    let event = {
      target: {
        innerWidth: 500
      }
    }
    component.onResize(event);
    expect(component.breakpoint).toBe(2);
  })
  it('Check for the windows inner width between 768 and 992', () => {
    let event = {
      target: {
        innerWidth: 800
      }
    }
    component.onResize(event);
    expect(component.breakpoint).toBe(3);
  })
  it('Check for the windows inner width above 992', () => {
    let event = {
      target: {
        innerWidth: 1200
      }
    }
    component.onResize(event);
    expect(component.breakpoint).toBe(4);
  })

  it('Check get created courses', () => {
    component.getCreatedCourses();
    expect(component.createdCourses).toBe(dashboardData.createdCourse.data.get_course_createdby_admin.message);
  })

  it('Check get published courses', () => {
    component.getPublishedCourses();
    expect(component.publishedCourses).toBe(dashboardData.publishedCourse.data.get_course_published.message);
  })

  it('Check get draft courses', () => {
    component.getDraftCourses();
    expect(component.draftCourses).toBe(dashboardData.draftCourse.data.get_draft_course.message);
  })

});
