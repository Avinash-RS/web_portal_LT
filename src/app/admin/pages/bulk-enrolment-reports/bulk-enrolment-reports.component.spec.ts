import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEnrolmentReportsComponent } from './bulk-enrolment-reports.component';

describe('BulkEnrolmentReportsComponent', () => {
  let component: BulkEnrolmentReportsComponent;
  let fixture: ComponentFixture<BulkEnrolmentReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEnrolmentReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEnrolmentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
