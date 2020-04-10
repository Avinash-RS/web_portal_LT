import { TestBed } from '@angular/core/testing';

import { WcaService } from './wca.service';

describe('WcaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WcaService = TestBed.get(WcaService);
    expect(service).toBeTruthy();
  });
});
