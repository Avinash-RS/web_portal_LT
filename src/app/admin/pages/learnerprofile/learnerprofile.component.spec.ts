import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerprofileComponent } from './learnerprofile.component';

describe('LearnerprofileComponent', () => {
  let component: LearnerprofileComponent;
  let fixture: ComponentFixture<LearnerprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
