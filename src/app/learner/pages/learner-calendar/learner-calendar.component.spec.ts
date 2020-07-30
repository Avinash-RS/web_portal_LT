import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerCalendarComponent } from './learner-calendar.component';

describe('LearnerCalendarComponent', () => {
  let component: LearnerCalendarComponent;
  let fixture: ComponentFixture<LearnerCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
