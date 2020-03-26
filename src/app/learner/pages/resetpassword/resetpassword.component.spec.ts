import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetpasswordComponent } from './resetpassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {  MatDialogModule } from '@angular/material';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ResetpasswordComponent', () => {

  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;
  let backend: ApolloTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        ApolloTestingModule,
        RouterTestingModule
   ],
   providers: [Ng4LoadingSpinnerService, {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [ ResetpasswordComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
