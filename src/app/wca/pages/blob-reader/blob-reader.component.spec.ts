import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobReaderComponent } from './blob-reader.component';

describe('BlobReaderComponent', () => {
  let component: BlobReaderComponent;
  let fixture: ComponentFixture<BlobReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlobReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlobReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
