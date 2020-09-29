import { TestBed } from '@angular/core/testing';

import { LearnermycourseService } from './learnermycourse.service';

describe('LearnermycourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearnermycourseService = TestBed.get(LearnermycourseService);
    expect(service).toBeTruthy();
  });
});
