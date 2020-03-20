import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotUsernameAndPasswordComponent } from './forgot-username-and-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatRadioModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
        MatDialogModule
   ],
   providers: [Ng4LoadingSpinnerService,
    {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      declarations: [ ForgotUsernameAndPasswordComponent ]
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
});
