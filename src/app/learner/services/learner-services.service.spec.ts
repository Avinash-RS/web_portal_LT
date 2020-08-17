import { TestBed } from '@angular/core/testing';

import { LearnerServicesService } from './learner-services.service';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LearnerServicesService', () => {
  let backend: ApolloTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ApolloTestingModule,
      RouterTestingModule
 ],
 providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  }));
  beforeEach(() => {
    backend = TestBed.get(ApolloTestingController);
  });

  it('should be created', () => {
    const service: LearnerServicesService = TestBed.get(LearnerServicesService);
    expect(service).toBeTruthy();
  });
});
