import { TestBed } from '@angular/core/testing';

import { BlobServicesService } from './blob-services.service';

describe('BlobServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlobServicesService = TestBed.get(BlobServicesService);
    expect(service).toBeTruthy();
  });
});
