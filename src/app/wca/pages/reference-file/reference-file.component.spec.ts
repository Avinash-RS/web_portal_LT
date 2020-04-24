import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceFileComponent } from './reference-file.component';

describe('ReferenceFileComponent', () => {
  let component: ReferenceFileComponent;
  let fixture: ComponentFixture<ReferenceFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
