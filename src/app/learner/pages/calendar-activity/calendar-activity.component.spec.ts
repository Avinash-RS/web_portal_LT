import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarActivityComponent } from './calendar-activity.component';

describe('CalendarActivityComponent', () => {
  let component: CalendarActivityComponent;
  let fixture: ComponentFixture<CalendarActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
