import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModuleComponent } from './view-module.component';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {  RouterModule } from '@angular/router';

describe('ViewModuleComponent', () => {
  let component: ViewModuleComponent;
  let fixture: ComponentFixture<ViewModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterModule.forRoot([])
      ],
      declarations: [ ViewModuleComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No Course Name and Image to Display',()=> {
    expect(component.queryData).toBe(undefined);
    debugger
  })

});
