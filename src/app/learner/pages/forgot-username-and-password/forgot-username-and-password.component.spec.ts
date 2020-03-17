import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUsernameAndPasswordComponent } from './forgot-username-and-password.component';

describe('ForgotUsernameAndPasswordComponent', () => {
  let component: ForgotUsernameAndPasswordComponent;
  let fixture: ComponentFixture<ForgotUsernameAndPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotUsernameAndPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotUsernameAndPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
