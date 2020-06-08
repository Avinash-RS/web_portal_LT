import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistCoursesComponent } from './wishlist-courses.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material';

describe('WishlistCoursesComponent', () => {
  let component: WishlistCoursesComponent;
  let fixture: ComponentFixture<WishlistCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloModule,
        RouterModule.forRoot([]),MatDialogModule
      ],
      declarations: [ WishlistCoursesComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],

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

  it('Check for resize width below 480', () => {
    const event = {
      target: {
        innerWidth: 400
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(1);
  });
  it('Check for the windows inner width between 480 and 768', () => {
    const event = {
      target: {
        innerWidth: 650
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(2);
  });

  it('Check for the windows inner width between 768 and 992', () => {
    const event = {
      target: {
        innerWidth: 800
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(3);
  });
  it('Check for the windows inner width above 992', () => {
    const event = {
      target: {
        innerWidth: 1200
      }
    };
    component.onResize(event);
    expect(component.breakpoint).toBe(4);
  });
  it('viewwishlist', () => {
    component. viewWishlist();
    // expect(component.userdetail).toBe(component.checkLogout()) 
  });
});
