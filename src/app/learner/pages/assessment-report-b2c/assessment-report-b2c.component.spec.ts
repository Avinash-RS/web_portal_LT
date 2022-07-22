import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentReportB2cComponent } from './assessment-report-b2c.component';

describe('AssessmentReportB2cComponent', () => {
  let component: AssessmentReportB2cComponent;
  let fixture: ComponentFixture<AssessmentReportB2cComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentReportB2cComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentReportB2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
