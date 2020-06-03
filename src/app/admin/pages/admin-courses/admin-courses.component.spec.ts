import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursesComponent } from './admin-courses.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule,
  MatDialogModule, MatTooltipModule, MatDialogRef, MatTabHeader, MatHeaderRow, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRowDef, MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef, MatTableModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { AlertComponentComponent } from '@core/shared/alert-component/alert-component.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminMockService } from '@admin/services/mock-services/admin-mock.service';
import { AdminServicesService } from '@admin/services/admin-services.service';

describe('AdminCoursesComponent', () => {
  let component: AdminCoursesComponent;
  let fixture: ComponentFixture<AdminCoursesComponent>;
  let service: AdminMockService;
  const admincourse = require('assets/mockdata/wca/admin-courses.json');
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxPaginationModule,
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
      providers: [Apollo, AdminServicesService],
      declarations: [AdminCoursesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(AdminMockService);
    fixture = TestBed.createComponent(AdminCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check for resize width below 600', () => {
    const event = {
      target: {
        innerWidth: 530
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(1);
  });
  it('Check for the windows inner width between 600 and 768', () => {
    const event = {
      target: {
        innerWidth: 650
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(2);
  });

  it('Check for the windows inner width between 768 and 1024', () => {
    const event = {
      target: {
        innerWidth: 800
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(3);
  });
  it('Check for the windows inner width above 1024', () => {
    const event = {
      target: {
        innerWidth: 1200
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(4);
  });

  it('Check get published courses', () => {
    // let service: AdminMockService;

    fixture.detectChanges();
    // service = TestBed.get(AdminMockService);

    component.pagenumber = 0;
    expect(component.type = 'published');
    component.getCourses();
    // debugger
    // expect(service.getAllCoursePublished("undefined", component.pagenumber)).toBe(admincourse.data.get_course_published.message);
    // let admincourse;
    // expect(admincourse = service.getAllCoursePublished("undefined", component.pagenumber))
    console.log(admincourse);
    // admincourse = service.getAllCoursePublished("undefined", component.pagenumber);

    // debugger
    expect(service.getAllCoursePublished('undefined', component.pagenumber));
    fixture.detectChanges();
    service.getAllCoursePublished('undefined', component.pagenumber).subscribe((adminCourse: any) => {
      // expect(value).toBe('observable value');
      fixture.detectChanges();
      console.log(adminCourse);
      expect(adminCourse.data && adminCourse.data.get_course_published.status === true);
      fixture.detectChanges();
      expect(component.courseList = adminCourse.data.get_course_published.message);
      expect(component.goto = 'publish');
      expect(component.showPublishedDate = true);
      expect(component.loader = false);
      expect(component.btnType = null);
      expect(component.showCount = true);
      expect(component.showRating = true);
      expect(component.showPrice = true);
      expect(component.courseCount = 1);
      expect(component.viewType = 'grid');
      expect(component.breakpoint = 4);
      console.log(adminCourse.data.get_course_published.message, 'admincourses :', component.courseList);
    });

    // let service = fixture.debugElement.injector.get(AdminMockService);
    // spyOn(service, 'getAllCoursePublished').and.returnValue({
    //   subscribe: (v) => {
    //     console.log(v)
    //   }
    // });
    // debugger
    // fixture.componentInstance.getCourses();
    // fixture.detectChanges();
    // expect(service.getAllCoursePublished).toHaveBeenCalled();
    // fixture.detectChanges();
    // // expect(component.courseList).toEqual(admincourse);
    // console.log(admincourse)
    // expect(component.courseList).toEqual(response);

    //   spyOn(userService, 'getUsers').and.returnValue(of(response))

    // homeComponent.getUsers();

    // fixture.detectChanges();

    // expect(homeComponent.listOfUsers).toEqual(response);



  });
});
