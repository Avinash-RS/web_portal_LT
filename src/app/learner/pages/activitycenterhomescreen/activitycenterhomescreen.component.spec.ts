import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitycenterhomescreenComponent } from './activitycenterhomescreen.component';

describe('ActivitycenterhomescreenComponent', () => {
  let component: ActivitycenterhomescreenComponent;
  let fixture: ComponentFixture<ActivitycenterhomescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitycenterhomescreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitycenterhomescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
