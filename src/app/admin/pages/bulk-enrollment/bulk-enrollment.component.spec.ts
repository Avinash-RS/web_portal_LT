import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEnrollmentComponent } from './bulk-enrollment.component';

describe('BulkEnrollmentComponent', () => {
  let component: BulkEnrollmentComponent;
  let fixture: ComponentFixture<BulkEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
