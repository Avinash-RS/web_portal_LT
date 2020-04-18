import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let backend: ApolloTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        ApolloTestingModule,
        RouterTestingModule,
        MatDialogModule
   ],
      declarations: [ PasswordComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [Ng4LoadingSpinnerService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('form invalid when empty', () => {
    expect(component.passwordForm.valid).toBeFalsy();
  });

  it('username field validation', () => {
    let username = component.passwordForm.controls['username']
    expect(username.valid).toBeFalsy();
    let errors = {};
        errors = username.errors
        expect(errors['required']).toBeTruthy();
  });

  it('check password and confirm password is match'),() =>{
    let password = component.passwordForm.controls['password'];
    let conpassword =  component.passwordForm.controls['confirmpassword']
    if(password == conpassword){
      expect(password.valid).toBeTruthy();
    }else{
      expect(password.invalid).toBeFalsy();
    }
  }


  it('submitting a form emits a user', () => {
    expect(component.passwordForm.valid).toBeFalsy();
    component.passwordForm.controls['username'].setValue("test");
    component.passwordForm.controls['password'].setValue("123Aa!@#");
    expect(component.passwordForm.valid).toBeTruthy();
    component.submit();
  });
});
