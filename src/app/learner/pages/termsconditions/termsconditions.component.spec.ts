import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsconditionsComponent } from './termsconditions.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material';

describe('TermsconditionsComponent', () => {
  let component: TermsconditionsComponent;
  let fixture: ComponentFixture<TermsconditionsComponent>;
  const dialogMock = {
    closeAll: () => { }
    };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterModule.forRoot([]),
        MatDialogModule,
      ],
      declarations: [ TermsconditionsComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MatDialogRef, useValue:  dialogMock },
        { provide: MatDialogTitle , useValue: [] },
        { provide: MAT_DIALOG_DATA, useValue: {} },
    
        
        // ...
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close()', () => {
    let spy = spyOn(component.dialog, 'closeAll').and.callThrough();
    component.closedialogbox();
    expect(spy).toHaveBeenCalled();    
  });
});
