import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpskillCalendarComponent } from './upskill-calendar.component';

describe('UpskillCalendarComponent', () => {
  let component: UpskillCalendarComponent;
  let fixture: ComponentFixture<UpskillCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpskillCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpskillCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
