import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTemplateComponent } from './choose-template.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChooseTemplateComponent', () => {
  let component: ChooseTemplateComponent;
  let fixture: ComponentFixture<ChooseTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        MatRadioModule,
        MatDialogModule,
        MatTooltipModule,
        HttpClientModule,
        ApolloModule,
        RouterModule.forRoot([]),
        HttpLinkModule],
      declarations: [ChooseTemplateComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select template', () => {
    let template = {
      _id: "5e99334428ac5638acff9279",
      template_id: "TMP0001",
      name: "test1",
      createdby_id: "001",
      createdby_name: "test1",
      created_on: "4/17/2020, 10:09:36 AM"
    }
    component.selectTemplate(template);
    expect(component.selectedTemplate._id).toBe(template._id);
  })

  it('should get all the templates',() => {
    component.getTemplates();
  })

  it('Should parse templates', () => {
    let template = {
      _id: "5e99334428ac5638acff9279",
      template_id: "TMP0001",
      name: "test1",
      createdby_id: "001",
      createdby_name: "test1",
      created_on: "4/17/2020, 10:09:36 AM"
    }
    component.templateParse(template);

  })

  it('To check tooltip hover', () => {
    component.onHover("12345");
    expect(component.hoverId).toBe("12345");
    expect(component.isHover).toBe(true);

  })
  it('To check tooltip hover leave', () => {
    component.onhoverLeave();
    expect(component.hoverId).toBe('');
    expect(component.isHover).toBe(false);
  })
  
  it('To check nav create temp', () => {
    component.queryData = {
      viewingModule: 'Test module',
      courseName: "Test name"
    }
    component.navCreateTemp();
  })

});
