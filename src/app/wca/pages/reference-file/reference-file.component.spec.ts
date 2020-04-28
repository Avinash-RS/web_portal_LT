import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { ReferenceFileComponent } from './reference-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ReferenceFileComponent', () => {
  let component: ReferenceFileComponent;
  let fixture: ComponentFixture<ReferenceFileComponent>;
  let backend: ApolloTestingController;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableDataSource,
        ReactiveFormsModule,
        MatPaginator,
        MatSort,
        ApolloTestingModule,
        RouterTestingModule
   ],
   providers: [Ng4LoadingSpinnerService, {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
   schemas: [
     CUSTOM_ELEMENTS_SCHEMA
   ],
      declarations: [ ReferenceFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    backend = TestBed.get(ApolloTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
