import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkreportComponent } from './benchmarkreport.component';

describe('BenchmarkreportComponent', () => {
  let component: BenchmarkreportComponent;
  let fixture: ComponentFixture<BenchmarkreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchmarkreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
