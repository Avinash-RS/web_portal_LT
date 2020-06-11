import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerprofileComponent } from './learnerprofile.component';
import { MatTableModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LearnerprofileComponent', () => {
  let component: LearnerprofileComponent;
  let fixture: ComponentFixture<LearnerprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[  MatTableModule,
        ApolloModule,
        HttpClientModule,
        RouterTestingModule,
        RouterModule.forRoot([]),],
      declarations: [ LearnerprofileComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
});
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('page', () => {
    // expect(component).toBeTruthy();
  component.ngAfterViewInit();
  expect(component.dataSource.paginator).toBe(component.paginator);
  expect(component.dataSource1.paginator).toBe(component.paginator);  
});
});
