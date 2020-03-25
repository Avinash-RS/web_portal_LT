import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule,
  MatDialogModule, MatTooltipModule, MatDialogRef
} from '@angular/material';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertComponentComponent } from '@core/shared/alert-component/alert-component.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClient,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        MatRadioModule,
        MatDialogModule,
        MatTooltipModule,
        HttpClientModule,
        ApolloModule,
        Apollo,
        HttpLinkModule],
      declarations: [LoginComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [Apollo, AlertComponentComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {

    let errors = {};
    let uname = component.loginForm.controls['username'];
    expect(uname.valid).toBeFalsy();

    errors = uname.errors || {};
    expect(errors['required']).toBeTruthy();

    uname.setValue("test!@");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    uname.setValue("test");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();

    uname.setValue("test123");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    password.setValue("123Aa!@#");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("test");
    component.loginForm.controls['password'].setValue("123Aa!@#");
    expect(component.loginForm.valid).toBeTruthy();

    // let user: User;
    // // Subscribe to the Observable and store the user in a local variable.
    // component.loggedIn.subscribe((value) => user = value);

    // Trigger the login function
    component.login();

    // Now we can check to make sure the emitted value is correct
    // expect(user.email).toBe("test@test.com");
    // expect(user.password).toBe("123456789");
  });
});
