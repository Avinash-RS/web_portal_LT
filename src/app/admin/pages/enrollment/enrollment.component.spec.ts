import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentComponent } from './enrollment.component';
import { MatTableModule } from '@angular/material';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material';
// import { AdminServicesService } from '@admin/services/admin-services.service';



describe('EnrollmentComponent', () => {
  let component: EnrollmentComponent;
  let fixture: ComponentFixture<EnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentComponent ],
      imports: [MatTableModule, ApolloModule, HttpLinkModule, RouterModule, HttpClientModule, Router, MatDialog, NgModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      // providers: [
      //   { provide: AdminServicesService }
      // ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//testing