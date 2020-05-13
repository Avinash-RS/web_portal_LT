import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursesComponent } from './admin-courses.component';
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
import {NgxPaginationModule} from 'ngx-pagination'; 
describe('AdminCoursesComponent', () => {
  let component: AdminCoursesComponent;
  let fixture: ComponentFixture<AdminCoursesComponent>;
  let admincourse = require("../../../../assets/mockdata/wca/admin-course.json");
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
      providers: [Apollo],
      declarations: [ AdminCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check for resize width below 600', () => {
    let event = {
      target: {
        innerWidth: 530
      }
    }
    component.onResize(event);
    expect(component.breakpoint).toBe(1);
  })

  it('Check for the windows inner width between 600 and 768', () => {
    let event = {
      target: {
        innerWidth: 650
      }
    }
    component.onResize(event);
    expect(component.breakpoint).toBe(2);
  })

  it('Check for the windows inner width between 768 and 1024', () => {
    let event = {
      target: {
        innerWidth: 800
      }
    }
    component.onResize(event);
    expect(component.breakpoint).toBe(3);
  })
  it('Check for the windows inner width above 1024', () => {
    let event = {
      target: {
        innerWidth: 1200
      }
    }
    component.onResize(event);
    expect(component.breakpoint).toBe(4);
  })

  it('Check get published courses', () => {
    let pagenumber = 0;
    component.onpagination(event) ;
    expect(component.type == 'published').toBe(admincourse.get_course_published.message);
  })
});
