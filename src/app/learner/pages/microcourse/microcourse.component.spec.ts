import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrocourseComponent } from './microcourse.component';

describe('MicrocourseComponent', () => {
  let component: MicrocourseComponent;
  let fixture: ComponentFixture<MicrocourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrocourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrocourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
