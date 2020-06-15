import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlogComponent } from './auditlog.component';
import { MatDatepickerModule, MatFormFieldModule, MatTableModule, MatNativeDateModule, MatDialogModule, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { formatDate } from '@angular/common';
describe('AuditlogComponent', () => {
  let component: AuditlogComponent;
  let fixture: ComponentFixture<AuditlogComponent>;
  const dialogMock = {
    closeAll: () => { }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule,
        MatTableModule,
        ApolloModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        MatNativeDateModule,
        MatDialogModule,
        // MatFormFieldModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [AuditlogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MatDialogTitle, useValue: [] },
        { provide: MAT_DIALOG_DATA, useValue: {} },


        // ...
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closedialog()', () => {
    const spy = spyOn(component.dialog, 'closeAll').and.callThrough();
    component.closedialogbox();
    expect(spy).toHaveBeenCalled();
  });

  it('destroy', () => {
    const spy = spyOn(component.dialog, 'closeAll').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  // it('formdate', () => {
  //   const fromdate = {
  //     date: 1010
  //   };
  //   expect(component.datefield(fromdate.date));
  //   expect(component.enablefield).toBe(false)

  // });

});
