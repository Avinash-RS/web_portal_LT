import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverFogotpasswordOTPComponent } from './recover-fogotpassword-otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
describe('RecoverFogotpasswordOTPComponent', () => {
  let component: RecoverFogotpasswordOTPComponent;
  let fixture: ComponentFixture<RecoverFogotpasswordOTPComponent>;
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
        RouterTestingModule,
   ],

  providers: [Ng4LoadingSpinnerService,
     {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [ RecoverFogotpasswordOTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverFogotpasswordOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
