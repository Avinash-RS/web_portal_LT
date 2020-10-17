import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerActivityCenterComponent } from './learner-activity-center.component';

describe('LearnerActivityCenterComponent', () => {
  let component: LearnerActivityCenterComponent;
  let fixture: ComponentFixture<LearnerActivityCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerActivityCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerActivityCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
