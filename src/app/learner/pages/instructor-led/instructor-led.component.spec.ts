import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLedComponent } from './instructor-led.component';

describe('InstructorLedComponent', () => {
  let component: InstructorLedComponent;
  let fixture: ComponentFixture<InstructorLedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorLedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
