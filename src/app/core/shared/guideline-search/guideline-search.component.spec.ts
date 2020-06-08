import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineSearchComponent } from './guideline-search.component';

describe('GuidelineSearchComponent', () => {
  let component: GuidelineSearchComponent;
  let fixture: ComponentFixture<GuidelineSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelineSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
