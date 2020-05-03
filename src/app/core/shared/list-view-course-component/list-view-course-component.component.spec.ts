import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewCourseComponentComponent } from './list-view-course-component.component';

describe('ListViewCourseComponentComponent', () => {
  let component: ListViewCourseComponentComponent;
  let fixture: ComponentFixture<ListViewCourseComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewCourseComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewCourseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
