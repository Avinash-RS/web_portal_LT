import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistCoursesComponent } from './wishlist-courses.component';

describe('WishlistCoursesComponent', () => {
  let component: WishlistCoursesComponent;
  let fixture: ComponentFixture<WishlistCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
