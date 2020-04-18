import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpComponent } from './otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('OtpComponent', () => {
  let component: OtpComponent;
  let fixture: ComponentFixture<OtpComponent>;
  let backend: ApolloTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ApolloTestingModule,
        RouterTestingModule,
        MatDialogModule
   ],
   providers: [Ng4LoadingSpinnerService,
    {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [ OtpComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.otpForm.valid).toBeFalsy();
  });
  it('mobile field validity', () => {

    let errors = {};
    let mobile = component.otpForm.controls['mobile'];
    expect(mobile.valid).toBeFalsy();

    errors = mobile.errors || {};
    expect(errors['required']).toBeTruthy();

    mobile.setValue("9843567643");
    errors = mobile.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    mobile.setValue("054345");
    errors = mobile.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    mobile.setValue("0978954");
    errors = mobile.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    mobile.setValue("12376867867");
    errors = mobile.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
  });


  it('otp field validity', () => {

    let errors = {};
    let otp = component.otpForm.controls['otp'];
    expect(otp.valid).toBeFalsy();

    errors = otp.errors || {};
    expect(errors['required']).toBeTruthy();

    otp.setValue("9840");
    errors = otp.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    otp.setValue("054345");
    errors = otp.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    otp.setValue("097");
    errors = otp.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    otp.setValue("12376867867");
    errors = otp.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
  });
  it('submitting a form emits a user', () => {
    expect(component.otpForm.valid).toBeFalsy();
    component.otpForm.controls['mobile'].setValue("7737924803");
    component.otpForm.controls['otp'].setValue("1234");
    expect(component.otpForm.valid).toBeTruthy();
    component.otpverify();
  });
});
