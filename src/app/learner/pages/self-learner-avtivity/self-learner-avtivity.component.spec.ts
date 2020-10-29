import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfLearnerAvtivityComponent } from './self-learner-avtivity.component';

describe('SelfLearnerAvtivityComponent', () => {
  let component: SelfLearnerAvtivityComponent;
  let fixture: ComponentFixture<SelfLearnerAvtivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfLearnerAvtivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfLearnerAvtivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
