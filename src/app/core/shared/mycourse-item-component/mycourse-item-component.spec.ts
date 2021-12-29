import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycourseItemComponent } from './mycourse-item-component';
import {
  MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule,
  MatDialogModule, MatTooltipModule, MatTableModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseComponentComponent', () => {
  let component: MycourseItemComponent;
  let fixture: ComponentFixture<MycourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MycourseItemComponent],
      imports: [MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule,
        MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule,
        MatDialogModule, MatTooltipModule, MatTableModule, HttpClientModule,
        ApolloModule,
        RouterModule.forRoot([]),
        HttpLinkModule],

      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
      ],
      providers: [
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  // it('should render title in a p tag', () => {
  //   // const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('p').textContent).toBeTruthy();
  // });
  // it('should gotodescription', () => {

  // });

});
