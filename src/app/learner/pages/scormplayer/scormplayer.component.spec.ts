import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScormplayerComponent } from './scormplayer.component';

describe('ScormplayerComponent', () => {
  let component: ScormplayerComponent;
  let fixture: ComponentFixture<ScormplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScormplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScormplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
