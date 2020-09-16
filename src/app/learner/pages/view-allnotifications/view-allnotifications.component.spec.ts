import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllnotificationsComponent } from './view-allnotifications.component';

describe('ViewAllnotificationsComponent', () => {
  let component: ViewAllnotificationsComponent;
  let fixture: ComponentFixture<ViewAllnotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllnotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllnotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
