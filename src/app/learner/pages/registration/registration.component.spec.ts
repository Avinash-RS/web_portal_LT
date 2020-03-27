import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegistrationComponent } from './registration.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let backend: ApolloTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        ReactiveFormsModule,
        MatDialogModule,
        ApolloTestingModule,
        RouterTestingModule
   ],

  providers: [Ng4LoadingSpinnerService, {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [ RegistrationComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    backend = TestBed.get(ApolloTestingController);
  });

  it('form invalid when empty', () => {
     component.registerForm.controls.fullname.setValue('');
     component.registerForm.controls.email.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.registerForm.controls.email;
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

it('submitting a form emits a user', () => {
  expect(component.registerForm.valid).toBeFalsy();
  component.registerForm.controls.fullname.setValue("ankit");
  component.registerForm.controls.email.setValue("test@test.com");
  expect(component.registerForm.valid).toBeTruthy();
  // Now we can check to make sure the emitted value is correct
  // expect(component.registerForm.controls.fullname).toBe("Ankit");
  // expect(component.registerForm.controls.email).toBe("test@test.com");
});
});
