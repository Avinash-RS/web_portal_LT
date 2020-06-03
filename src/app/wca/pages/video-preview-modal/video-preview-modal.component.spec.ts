import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPreviewModalComponent } from './video-preview-modal.component';

describe('VideoPreviewModalComponent', () => {
  let component: VideoPreviewModalComponent;
  let fixture: ComponentFixture<VideoPreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
