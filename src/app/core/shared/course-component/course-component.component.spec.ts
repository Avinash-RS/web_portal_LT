import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponentComponent } from './course-component.component';
import {
  MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule,
  MatDialogModule, MatTooltipModule, MatTableModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

describe('CourseComponentComponent', () => {
  let component: CourseComponentComponent;
  let fixture: ComponentFixture<CourseComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponentComponent],
      imports: [MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule,
        MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule,
        MatDialogModule, MatTooltipModule, MatTableModule, HttpClientModule,
        ApolloModule,
        RouterModule.forRoot([]),
        HttpLinkModule],

      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        { provide: Ng4LoadingSpinnerService }
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
