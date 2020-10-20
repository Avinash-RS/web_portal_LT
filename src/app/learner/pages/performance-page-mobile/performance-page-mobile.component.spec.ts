import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancePageMobileComponent } from './performance-page-mobile.component';

describe('PerformancePageMobileComponent', () => {
  let component: PerformancePageMobileComponent;
  let fixture: ComponentFixture<PerformancePageMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformancePageMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancePageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
