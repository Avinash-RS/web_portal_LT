import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGalleryComponent } from './course-gallery.component';

describe('CourseGalleryComponent', () => {
  let component: CourseGalleryComponent;
  let fixture: ComponentFixture<CourseGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
