import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopicComponent } from './create-topic.component';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule, FormsModule,
  NG_VALUE_ACCESSOR, DefaultValueAccessor, ControlValueAccessor  } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {APP_BASE_HREF} from '@angular/common';
import { MatSelectModule, MatFormFieldModule, MatInputModule , MatCheckboxModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('CreateTopicComponent', () => {
  let component: CreateTopicComponent;
  let fixture: ComponentFixture<CreateTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTopicComponent ],
      imports: [
        // ReactiveFormsModule,
        HttpClientModule,
        // FormsModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
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
        ToastrService,
        // {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
