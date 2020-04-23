import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotUsernameAndPasswordComponent } from './forgot-username-and-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatRadioModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('ForgotUsernameAndPasswordComponent', () => {
  let component: ForgotUsernameAndPasswordComponent;
  let fixture: ComponentFixture<ForgotUsernameAndPasswordComponent>;
  let backend: ApolloTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatTabsModule,
        ApolloTestingModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
   ],
   providers: [Ng4LoadingSpinnerService,
    {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [ ForgotUsernameAndPasswordComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotUsernameAndPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mobile field validity', () => {

    let errors = {};
    let mobile = component.forgotPasswordform.controls['mobile'];
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

  it('username field validity', () => {
    let errors = {};
    let uname = component.forgotPasswordform.controls['username'];
    expect(uname.valid).toBeFalsy();

    errors = uname.errors || {};
    expect(errors['required']).toBeTruthy();

    uname.setValue("test!@");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    uname.setValue("te");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    uname.setValue("test5test10test16test");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();

    uname.setValue("test");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    uname.setValue("test123");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    uname.setValue("123");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
  });

  
  it('email field validity', () => {
    let errors = {};
    let email = component.forgotPasswordform.controls.email;
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
});
});
