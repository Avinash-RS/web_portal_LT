import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerMyCourseComponent } from './learner-my-course.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule,
  MatDialogModule, MatTooltipModule, MatDialogRef, MatTabHeader, MatHeaderRow, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef, MatTableModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { AlertComponentComponent } from '@core/shared/alert-component/alert-component.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'
describe('LearnerMyCourseComponent', () => {
  let component: LearnerMyCourseComponent;
  let fixture: ComponentFixture<LearnerMyCourseComponent>;
  let mycourse = require('../../../../assets/mockdata/wca/learner-my-course.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
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
        HttpLinkModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers:[Ng4LoadingSpinnerService],
      declarations: [ LearnerMyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerMyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('Check get mycourse', () => {
    component.viewMycourse();
    expect(component.myCoursesList).toBe(mycourse.data.get_course_by_user.message.course_img_url);
  })

  it('Check get wishlist', () => {
    component. viewWishlist();
    expect(component.wishlist).toBe(mycourse.publishedCourse.data.get_course_published.message);
  })
});
