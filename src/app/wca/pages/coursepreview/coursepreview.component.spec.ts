import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepreviewComponent } from './coursepreview.component';

describe('CoursepreviewComponent', () => {
  let component: CoursepreviewComponent;
  let fixture: ComponentFixture<CoursepreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursepreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursepreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
