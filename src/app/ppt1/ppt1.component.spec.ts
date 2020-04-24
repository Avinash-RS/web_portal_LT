import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ppt1Component } from './ppt1.component';

describe('Ppt1Component', () => {
  let component: Ppt1Component;
  let fixture: ComponentFixture<Ppt1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ppt1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ppt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
