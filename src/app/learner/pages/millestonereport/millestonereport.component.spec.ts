import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillestonereportComponent } from './millestonereport.component';

describe('MillestonereportComponent', () => {
  let component: MillestonereportComponent;
  let fixture: ComponentFixture<MillestonereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MillestonereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MillestonereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
