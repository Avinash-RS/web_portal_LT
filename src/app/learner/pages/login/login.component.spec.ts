import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { MockServiceService } from '@learner/services/mockService/mock-service.service';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        RouterModule.forRoot([]),
        HttpLinkModule],
      declarations: [LoginComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [Apollo, AlertComponentComponent, LearnerServicesService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: LearnerServicesService, useClass: MockServiceService }]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login');
    expect(component.loginForm.controls['username']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let errors = {};
    let uname = component.loginForm.controls['username'];
    expect(uname.valid).toBeFalsy();

    errors = uname.errors || {};
    expect(errors['required']).toBe(true);

    uname.setValue("test");
    errors = uname.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    let service: MockServiceService;
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("test");
    component.loginForm.controls['password'].setValue("123Aa!@#");
    expect(component.loginForm.valid).toBeTruthy();

    fixture.detectChanges();

    service = TestBed.get(MockServiceService);

    // spyOn(component,'login').and.callThrough();
    debugger
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.login())
    console.log(service.login);

  });
});