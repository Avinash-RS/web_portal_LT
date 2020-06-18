import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatButtonModule, MatMenuModule, MatInputModule, MatToolbarModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule, MatSelectModule, MatRadioModule,
  MatDialogModule, MatTooltipModule, MatDialogRef, MatTabHeader, MatHeaderRow, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef, MatTableModule, MatDialogTitle, MAT_DIALOG_DATA
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { AlertComponentComponent } from '@core/shared/alert-component/alert-component.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let usermanagement = require("../../../../assets/mockdata/wca/user-management.json");
  const dialogMock = {
    closeAll: () => { }
    };

    let mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        MatRadioModule,
        MatDialogModule,
        MatTooltipModule,
        MatTableModule,
        ToastrModule.forRoot({
          timeOut: 5000,
          positionClass: 'toast-bottom-center',
          preventDuplicates: true,
          closeButton: true,
          progressBar: true,
          maxOpened: 1,
          autoDismiss: true,
          enableHtml: true
        }),
        HttpClientModule,
        ApolloModule,
        RouterModule.forRoot([]),
        HttpLinkModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [Apollo,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MatDialogRef, useValue:  dialogMock },
        { provide: MatDialogTitle , useValue: [] },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Router, useValue: mockRouter},
      ],
      declarations: [UserManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the details', () => {
    let pagenumber = 0;
    // let message = {
    //   username: "ramya123",
    //   user_id: "v296ah",
    //   email: "ramyathothathiri@lntecc.com",
    //   mobile_number: "7358321980",
    //   is_active: true
    // }
    // debugger
    component.getAllUser(pagenumber);
    expect(component.ELEMENT_DATA).toBe(usermanagement.data.get_all_user.message);// here email should not come



    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(1);

      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('select');
      expect(headerRow.cells[1].innerHTML).toBe('user_id');
      expect(headerRow.cells[2].innerHTML).toBe('name');
      expect(headerRow.cells[3].innerHTML).toBe('email');
      expect(headerRow.cells[4].innerHTML).toBe('mobile');
      expect(headerRow.cells[5].innerHTML).toBe('active');
      expect(headerRow.cells[6].innerHTML).toBe('actions');

      let row1 = tableRows[1];
      //  expect(row1.cells[1].innerHTML).toBe('dummy@mail.com');
      expect(row1.cells[1].innerHTML).toBe(usermanagement.data.get_all_user.message.user_id);
      console.log(row1);
      //  expect(row1.cells[2].innerHTML).toBe('01-01-2020');
      expect(row1.cells[1].innerHTML).toBe(usermanagement.data.get_all_user.message.name);
      //  expect(row1.cells[3].innerHTML).toBe('admin,standard');
      expect(row1.cells[1].innerHTML).toBe(usermanagement.data.get_all_user.message.email);
      //  expect(row1.cells[4].innerHTML).toBe('99999');
      expect(row1.cells[1].innerHTML).toBe(usermanagement.data.get_all_user.message.mobile);

    })
  });

  // it('Close the Dialog Box', () => {
  //   component.closedialogbox()
  //   expect(component.dialog).toBeTruthy();

  // });
  it('close()', () => {
    let spy = spyOn(component.dialog, 'closeAll').and.callThrough();
    component. ngOnDestroy();
    expect(spy).toHaveBeenCalled();    
  });

  it('router', () => {
    component.gotoAddUser();
    expect (mockRouter.navigate).toHaveBeenCalledWith (['/Admin/auth/addUser']);

  });


});
