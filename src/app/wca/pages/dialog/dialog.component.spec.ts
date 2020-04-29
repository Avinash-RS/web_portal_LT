import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatCardModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
        MatDialogModule,
        MatCardModule
    ],  
      declarations: [ DialogComponent ],
      providers: [
        ToastrService,
        // {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('Close the Dialog Box', () => {
    component.templateName()
    expect(component.templateForm.valid).toBeTruthy();
    debugger;
  });

  it('Template Name Required', () => {
    component.templateName()
    expect(component.templateForm.valid).toBeFalsy();
  });

  

});
