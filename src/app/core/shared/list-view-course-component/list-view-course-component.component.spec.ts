import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewCourseComponentComponent } from './list-view-course-component.component';


import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'
describe('ListViewCourseComponentComponent', () => {
  let component: ListViewCourseComponentComponent;
  let fixture: ComponentFixture<ListViewCourseComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloModule,
        MatDialogModule,  RouterModule.forRoot([])
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [Ng4LoadingSpinnerService],
      declarations: [ ListViewCourseComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewCourseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', () => {
  //   expect(component.enrollCourse).toBeTruthy();
  // });
});
