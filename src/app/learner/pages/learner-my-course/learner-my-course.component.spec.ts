import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerMyCourseComponent } from './learner-my-course.component';

describe('LearnerMyCourseComponent', () => {
  let component: LearnerMyCourseComponent;
  let fixture: ComponentFixture<LearnerMyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerMyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerMyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
