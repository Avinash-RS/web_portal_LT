import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycreatedCourseComponent } from './mycreated-course.component';

describe('MycreatedCourseComponent', () => {
  let component: MycreatedCourseComponent;
  let fixture: ComponentFixture<MycreatedCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycreatedCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycreatedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
