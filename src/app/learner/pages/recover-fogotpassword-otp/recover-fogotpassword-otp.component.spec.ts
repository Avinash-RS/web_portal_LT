import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverFogotpasswordOTPComponent } from './recover-fogotpassword-otp.component';

describe('RecoverFogotpasswordOTPComponent', () => {
  let component: RecoverFogotpasswordOTPComponent;
  let fixture: ComponentFixture<RecoverFogotpasswordOTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverFogotpasswordOTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverFogotpasswordOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
