import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ppt2Component } from './ppt2.component';

describe('Ppt2Component', () => {
  let component: Ppt2Component;
  let fixture: ComponentFixture<Ppt2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ppt2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ppt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
