import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingreportComponent } from './trainingreport.component';

describe('TrainingreportComponent', () => {
  let component: TrainingreportComponent;
  let fixture: ComponentFixture<TrainingreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
