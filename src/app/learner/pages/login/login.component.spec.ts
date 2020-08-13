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
import { RouterTestingModule } from '@angular/router/testing';
import { LearnerMyCourseComponent } from '../learner-my-course/learner-my-course.component';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
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
      providers: [Apollo, AlertComponentComponent, LearnerServicesService,
      ],
    })
      .compileComponents();
  }));

 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [ ],
      imports: [  RouterTestingModule.withRoutes([]),],
      // providers: [{ provide: LearnerServicesService, useClass: MockServiceService }]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    component.ngOnInit();
    localStorage.removeItem('UserDetails');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('adminDetails');
    fixture.detectChanges();
  });
 

  // it('should create and identify components', () => {
  //   expect(component).toBeTruthy();
  //   let loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login');
  //   expect(component.loginForm.controls['username']).toBeDefined();
  //   expect(component.loginForm.controls['password']).toBeDefined();
  //   expect(loginBtnContainer).toBeDefined();
  // });

  // it('form invalid when empty', () => {
  //   expect(component.loginForm.valid).toBeFalsy();
  // });

  // it('should click remember me change value', () => {
  //   let myCheckboxControl = component.loginForm.controls['remember_me'];
  //   expect(myCheckboxControl.value).toEqual(false);
  //   //set checkbox state to true
  //   myCheckboxControl.setValue(true);
  //   fixture.detectChanges();
  // });

  // it('username field validity', () => {
  //   let errors = {};
  //   let uname = component.loginForm.controls['username'];
  //   expect(uname.valid).toBeFalsy();
  //   errors = uname.errors || {};
  //   expect(errors['required']).toBe(true);
  //   uname.setValue("test");
  //   errors = uname.errors || {};
  //   expect(errors['required']).toBeFalsy();
  // });

  // it('password field validity', () => {
  //   let errors = {};
  //   let password = component.loginForm.controls['password'];
  //   errors = password.errors || {};
  //   expect(errors['required']).toBeTruthy();
  //   password.setValue("123456");
  //   errors = password.errors || {};
  //   expect(errors['required']).toBeFalsy();
  // });

  // it('submitting a form emits a user while remeber me is true', () => {
  //   let service: MockServiceService;

  //   const component = fixture.componentInstance;
  //   const navigateSpy = spyOn(router, 'navigate');
    
  //   expect(component.loginForm.valid).toBeFalsy();
  //   component.loginForm.controls['username'].setValue("test");
  //   component.loginForm.controls['remember_me'].setValue(true);
  //   component.loginForm.controls['password'].setValue("123Aa!@#");
  //   expect(component.loginForm.valid).toBeTruthy();

  //   fixture.detectChanges();
  //   service = TestBed.get(MockServiceService);

  //   const button = fixture.debugElement.nativeElement.querySelector('#login');
    
  //   button.click();
  //   expect(component.login())
  //   let loginresult;
  //   loginresult = service.login();
  //   console.log(loginresult);
  //   if (loginresult.data.login) {
  //     if (loginresult.data.login.success) {
  //       if (loginresult.data.login && component.loginForm.value.remember_me === true) {
  //         localStorage.setItem('uname', component.loginForm.value.username);
  //         localStorage.setItem('remember_me', 'true');
  //         var ps = btoa(component.loginForm.value.password);
  //         localStorage.setItem('ps', ps);
  //         localStorage.setItem('login', 'true');
  //         localStorage.setItem('role', 'learner')
  //         localStorage.setItem('token', loginresult.data.login.message.token)
  //         localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message))
  //         // debugger
  //         // if (loginresult.data.login.message.is_profile_updated) {
  //           // expect(routerStub.navigate).toHaveBeenCalledWith(['/Learner/MyCourse']);
  //           // expect(navigateSpy).toHaveBeenCalledWith(['/Learner/MyCourse']);
  //         // }
  //         // else {
  //           // expect(routerStub.navigate).toHaveBeenCalledWith(['/Learner/profile']);
  //         // }
  //       } else {
  //         localStorage.setItem('UserDetails', JSON.stringify(loginresult.data.login.message))
  //         localStorage.setItem('remember_me', 'false');
  //         localStorage.setItem('uname', component.loginForm.value.username);
  //         localStorage.setItem('login', 'true');
  //         localStorage.setItem('role', 'learner');
  //         localStorage.setItem('token', loginresult.data.login.message.token)
  //         var ps = btoa(component.loginForm.value.password);
  //         localStorage.setItem('ps', ps);
  //         // if (loginresult.data.login.message.is_profile_updated)
  //         //   router.navigate(['/Learner/MyCourse'])
  //         //   // expect(location.path()).toBe('/home');
  //         // else {
  //         //   router.navigate(['/Learner/profile'])
  //         // }
  //       }
  //     } else {
  //       component.loginForm.reset();
  //     }
  //   } else {
  //     component.loginForm.reset();
  //   }
  // });
});