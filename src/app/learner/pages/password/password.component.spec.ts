import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
