import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { MatSelectModule, MatTabsModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpLinkModule } from 'apollo-angular-link-http';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule,
        // MatTabsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot([]),MatDialogModule,
        ApolloModule,  HttpClientModule,
        HttpLinkModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [ AddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create', () => {
    component. fileBrowseHandler(File);
    expect(component.bulkuserupload(File))
  })
});
