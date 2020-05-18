import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryManagementComponent } from './catagory-management.component';

describe('CatagoryManagementComponent', () => {
  let component: CatagoryManagementComponent;
  let fixture: ComponentFixture<CatagoryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagoryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
