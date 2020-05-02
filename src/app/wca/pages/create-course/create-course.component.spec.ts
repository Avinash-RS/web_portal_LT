import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseComponent } from './create-course.component';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {WcaService} from '../../services/wca.service';
import { MatChipInputEvent, MatChipsModule } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

describe('CreateCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCourseComponent ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        MatChipsModule,
        NgxSpinnerModule
        // MatSelectModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatCheckboxModule,
        // BrowserAnimationsModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        ToastrService,WcaService
        // {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
