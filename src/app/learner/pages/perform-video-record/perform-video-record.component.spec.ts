import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformVideoRecordComponent } from './perform-video-record.component';

describe('PerformVideoRecordComponent', () => {
  let component: PerformVideoRecordComponent;
  let fixture: ComponentFixture<PerformVideoRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformVideoRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformVideoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
