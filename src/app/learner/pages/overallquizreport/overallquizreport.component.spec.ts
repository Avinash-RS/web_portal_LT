import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallquizreportComponent } from './overallquizreport.component';

describe('OverallquizreportComponent', () => {
  let component: OverallquizreportComponent;
  let fixture: ComponentFixture<OverallquizreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallquizreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallquizreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
