import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageComponent } from './landingpage.component';

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check for resize width below 600', () => {
    const event = {
      target: {
        innerWidth: 530
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(1);
  });
  it('Check for the windows inner width between 600 and 768', () => {
    const event = {
      target: {
        innerWidth: 650
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(2);
  });

  it('Check for the windows inner width between 768 and 1024', () => {
    const event = {
      target: {
        innerWidth: 800
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(3);
  });
  it('Check for the windows inner width above 1024', () => {
    const event = {
      target: {
        innerWidth: 1200
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(4);
  });
});
