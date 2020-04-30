import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddModuleComponent } from './add-module.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule, MatDialogModule, MatTooltipModule, MatDialogRef } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { WcaService } from '@wca/services/wca.service';
import { MockWcaService } from '@wca/services/wca.mock.service';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AddModuleComponent', () => {
  let component: AddModuleComponent;
  let fixture: ComponentFixture<AddModuleComponent>;
  let addModuleData = require("../../../../assets/mockdata/wca/add-module.json");

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
        DragDropModule,
        ToastrModule,
        RouterModule.forRoot([]),
        HttpLinkModule],
      declarations: [AddModuleComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: WcaService, useClass: MockWcaService },
        MatDialogRef,
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.routedCourseDetails = addModuleData.courseDetails;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('Check reset List', () => {
  //   component.courseDetails.coursedetails = addModuleData.courseDetails;
  // })

  fit("check drop method", () => {
    var event;
    event = {
      previousContainer: 1,
      container: 2
    }
    component.drop(event);
  })

  it("check get course details method", () => {
    component.getCourseDetails();
    expect(component.courseDetails).toBe(addModuleData.createdCourse.Result[0])
  })

  it("Check update course detail method", () => {
    component.courseDetails = addModuleData.createdCourse.Result[0];
    component.updateCourseDetails();
    expect(component.noOfModules).toBe(2);
  })

  it("Check delete module functionality", () => {
    let modStatus;
    component.courseDetails = addModuleData.createdCourse.Result[0];
    component.deleteModule("test2");
    component.courseDetails.coursedetails.forEach((data) => {
      if (data.modulename == "test2") {
        modStatus = data.modulestatus;
      }
    })
    expect(component.courseDetails.flag).toBe('false');
    expect(modStatus).toBe('false');
  })

  it('Should update the module changes', () => {
    component.courseDetails = addModuleData.createdCourse.Result[0];
    component.onCreate();
  })
});
