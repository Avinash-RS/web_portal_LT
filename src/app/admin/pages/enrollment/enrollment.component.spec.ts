import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentComponent } from './enrollment.component';
import { MatTableModule } from '@angular/material';



describe('EnrollmentComponent', () => {
  let component: EnrollmentComponent;
  let fixture: ComponentFixture<EnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentComponent ],
      imports: [MatTableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
