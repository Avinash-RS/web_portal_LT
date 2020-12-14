import { TestBed, async, inject } from '@angular/core/testing';

import { IsLoggedInAuthGuard } from './is-logged-in-auth.guard';

describe('IsLoggedInAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedInAuthGuard]
    });
  });

  it('should ...', inject([IsLoggedInAuthGuard], (guard: IsLoggedInAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
