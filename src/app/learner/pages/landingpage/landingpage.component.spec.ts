import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageComponent } from './landingpage.component';
import { LandingHeaderComponent } from '@core/core/landing-header/landing-header.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;
  let landingpage = require('assets/mockdata/wca/landingpage.json');
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule /* or CommonModule */,
        FormsModule, ReactiveFormsModule,
        MatDialogModule, ApolloModule,
        HttpLinkModule, HttpClientModule
      ],
      declarations: [LandingpageComponent,LandingHeaderComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpageComponent);
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

  // it('popular courses', () => {
  //   component.popular();
  //   expect(component.popularCOurse).toBe(landingpage.data1.get_popular_course.data.course_img_url);
  // });

  // it('trending courses', () => {
  //   component.trending();
  //   expect(component.trendingCourse).toBe(landingpage.data.get_popular_course.data);
  // });

});
