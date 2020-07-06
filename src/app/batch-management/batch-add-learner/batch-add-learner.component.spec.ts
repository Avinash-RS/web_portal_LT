import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAddLearnerComponent } from './batch-add-learner.component';

describe('BatchAddLearnerComponent', () => {
  let component: BatchAddLearnerComponent;
  let fixture: ComponentFixture<BatchAddLearnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchAddLearnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchAddLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
