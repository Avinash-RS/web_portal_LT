import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAddCourseComponent } from './batch-add-course.component';

describe('BatchAddCourseComponent', () => {
  let component: BatchAddCourseComponent;
  let fixture: ComponentFixture<BatchAddCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchAddCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
