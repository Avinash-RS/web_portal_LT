import { TestBed } from '@angular/core/testing';

import { AdminMockService } from './admin-mock.service';

describe('AdminMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMockService = TestBed.get(AdminMockService);
    expect(service).toBeTruthy();
  });
});
