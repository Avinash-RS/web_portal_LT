import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponentComponent } from './alert-component.component';
import { MatDialogModule,MatDialogRef, MatDialogTitle,MAT_DIALOG_DATA} from '@angular/material/dialog';


describe('AlertComponentComponent', () => {
  let component: AlertComponentComponent;
  let fixture: ComponentFixture<AlertComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        // MatDialogRef
   ],
   providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: MatDialogRef, useValue: {} },
    { provide: MatDialogTitle , useValue: [] },
    { provide: MAT_DIALOG_DATA, useValue: {} },

    
    // ...
  ],
      declarations: [ AlertComponentComponent ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
