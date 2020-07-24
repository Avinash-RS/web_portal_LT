import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursedetailsComponent } from './coursedetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatButtonModule, MatMenuModule, MatToolbarModule,
   MatIconModule,  MatGridListModule, MatSelectModule,
  MatDialogModule, MatTooltipModule, MatTableModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


describe('CoursedetailsComponent', () => {
  let component: CoursedetailsComponent;
  let fixture: ComponentFixture<CoursedetailsComponent>;
  let coursedetails = require('../../../../assets/mockdata/learner/coursedetails');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule,
        MatTableModule,
        ToastrModule.forRoot({
          timeOut: 5000,
          positionClass: 'toast-bottom-center',
          preventDuplicates: true,
          closeButton: true,
          progressBar: true,
          maxOpened: 1,
          autoDismiss: true,
          enableHtml: true
        }),
        HttpClientModule,
        ApolloModule,
        RouterModule.forRoot([]),
        HttpLinkModule,
      ],
      declarations: [ CoursedetailsComponent ],

      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [Ng4LoadingSpinnerService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check get course details', () => {
    // component.viewCurseByID('qn5e4nhb');
    expect(component.course).toBe(coursedetails.data.viewCourse.message);
  });

  it('Check get course module', () => {
    component.playerModuleAndTopic(true);
    expect(component.scromModuleData).toBe(coursedetails.data1.playerModuleAndTopic.message[0].childData);
  });

  it('Check get assignments files', () => {
    component.getAssignmentmoduleData();
    expect(component.assignmentContent).toBe(coursedetails.data2.getAssignmentmoduleData.data[0]);
  });
});
