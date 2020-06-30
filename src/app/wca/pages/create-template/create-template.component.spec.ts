import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplateComponent } from './create-template.component';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ReactiveFormsModule, FormsModule,
  NG_VALUE_ACCESSOR, DefaultValueAccessor, ControlValueAccessor
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { APP_BASE_HREF } from '@angular/common';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { empty } from 'rxjs';


describe('CreateTemplateComponent', () => {
  let component: CreateTemplateComponent;
  let fixture: ComponentFixture<CreateTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTemplateComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        BrowserAnimationsModule,
        DragDropModule
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
    fixture = TestBed.createComponent(CreateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No Data in params', () => {
    expect(component.queryData).toBe(undefined);
  });

  it('Check Reset List', () => {
    component.resetList();
    expect(component.items2.length).toBe(0);
    // debugger;
  });

  it('Check Drop Else', () => {
    let event;
    event = {
      previousContainer: 1,
      container: 2
    };
    component.drop(event);
    // expect(component.items2.length).toBe(0);
    // debugger;
  });

  // xit('Check Drop If',()=>{
  //   var event;
  //   event = {
  //     previousContainer : 2,
  //     container : 2
  //   }
  //   component.drop(event);
  //   expect(component.items2.length).toBeGreaterThan(0);
  //   debugger;
  // })

  it('Check Remove New Link', () => {
    component.removenewLink(1);
    expect(component.items2.length).toBe(0);
  });

  it('Check route To', () => {
    component.queryData = {
      viewingModule: 'Test module',
      courseName: 'Test name'
    };
    component.routeTo();

  });

  it('Check If Saved Template Data', () => {
    const type = 'saveTemplate';
    component.savedTemplates(type);
  });

  it('Check Not Saved Template Data', () => {
    const type = 'randomTemp';
    component.savedTemplates(type);
  });

  // fit('Check If Saved Template Data',()=>{
  //   var type = 'saveTemplate';
  //   component.done = undefined;
  //   component.savedTemplates(type);
  //   expect(component.done).toBe(undefined);
  //   debugger;
  // })

});
