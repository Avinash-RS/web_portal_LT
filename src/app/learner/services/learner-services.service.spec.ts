import { TestBed } from '@angular/core/testing';

import { LearnerServicesService } from './learner-services.service';

describe('LearnerServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearnerServicesService = TestBed.get(LearnerServicesService);
    expect(service).toBeTruthy();
  });
});
