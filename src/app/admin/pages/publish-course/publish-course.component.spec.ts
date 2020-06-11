import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishCourseComponent } from './publish-course.component';
import { MatProgressSpinnerModule, MatTreeModule, MatIconModule, MatCheckboxModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';

describe('PublishCourseComponent', () => {
  let component: PublishCourseComponent;
  let fixture: ComponentFixture<PublishCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatProgressSpinnerModule,
        MatTreeModule,
        MatCheckboxModule,
        MatIconModule,
        MatSelectModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        ApolloModule,
        HttpClientModule,
        MatDialogModule,
        RouterModule.forRoot([])
      ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA,
          NO_ERRORS_SCHEMA
        ],
      declarations: [ PublishCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
