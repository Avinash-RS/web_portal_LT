import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import * as myGlobals from '@core/globals';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  fname: string;
  studendID: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  addUserForm: FormGroup;
  adminDetails: any;
  groups: any = [];
  group: any = null;
  exceljson: any; // excel json is assigned
  selectedfile = null; // excel file is assigned

  constructor(private router: Router, private formBuilder: FormBuilder, private gs: GlobalServiceService,
    // tslint:disable-next-line:align
    private alert: AlertServiceService, private service: AdminServicesService, ) {
    this.group = (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.group) || null;
    localStorage.setItem('role', 'admin');
    this.addUserForm = this.formBuilder.group({
      username: new FormControl('', myGlobals.fullnameVal),
      email: new FormControl('', myGlobals.emailVal),
      group: ['', myGlobals.req]
    });
    // this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.adminDetails = this.gs.checkLogout();
    this.service.getUserGroup()
      .subscribe((result: any) => {
        // this.groups = result.data.get_user_group.message;
        const tree = this.tree(result?.data?.get_user_group?.message, null);
        this.groups = this.flattree(tree);
        const index = this.groups.findIndex(x => x.group_id === this.group?.group_id);
        this.addUserForm.patchValue({ group: index !== -1 ? this.groups[index] : null});
      });
  }


  tree(data, root) {
    function setCount(object) {
        return object.children
            ? (object.count = object.children.reduce((s, o) => s + 1 + setCount(o), 0))
            : 0;
    }
    const t = {};
    data.forEach(o => {
        Object.assign(t[o.group_id] = t[o.group_id] || {}, o);
        t[o.parent_group_id] = t[o.parent_group_id] || {};
        t[o.parent_group_id].children = t[o.parent_group_id].children || [];
        t[o.parent_group_id].children.push(t[o.group_id]);
        if (o.parent_group_id === root) { t[o.group_id].root = true; }
    });
    setCount(t[root]);
    return t[root].children;
}
flattree(items) {
  const flat = [];
  items.forEach(item => {
    flat.push(item);
    if (Array.isArray(item.children) && item.children.length > 0) {
      flat.push(...this.flattree(item.children));
      delete item.children;
    }
    delete item.children;
  });
  return flat;
}
  get f() {
    return this.addUserForm.controls;
  }

  ngOnInit() {
  }

  addUser() {
    const fullname = this.addUserForm.value.username.trimLeft();
    if (fullname !== '') {
      if (fullname.length >= 3) {
        const admin = [];
        admin.push(this.adminDetails._id);
        this.service.user_registration(this.addUserForm.value.email, this.addUserForm.value.username,
          true, this.addUserForm.value.group.group_id, this.addUserForm.value.group.group_name, admin
        ).subscribe((result: any) => {
          if (result.data && result.data.user_registration) {
            if (result.data.user_registration.success === 'true') {
              this.addUserForm.reset();
              this.alert.openAlert('Success !', 'User added successfully');
            } else {
              this.alert.openAlert(result.data.user_registration.message, null);
            }
          } else {
            this.alert.openAlert('Please try again later', null);
          }
        });
      } else {
        this.alert.openAlert('Full name must be minimum of 3 characters long', null);
      }
    } else {
      this.alert.openAlert('Please enter full name', null);
    }
  }

  /**
   * Download sample excel template
   */
  downloadsampleexceltemplate() {
    const json: any = [{
      Full_Name: null,
      Email: null
    }];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Sample');
  }

  /**
   * Saves as excel file
   * @param buffer :json
   * @param fileName : string
   */
  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.csv';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export' + EXCEL_EXTENSION);
  }

  /**
   * Bulk user uploads
   * @param event :file
   */
  bulkuserupload(event) {
    this.selectedfile = '';
    const excelheaders = ['Full_Name', 'Email'];
    const ext = event[0].name.split('.').pop();
    if (event.length === 1 && ext === 'csv' || ext === 'xlsx' || ext === 'xls') {
      const File = event[0];
      const str = event[0].name.split('.');
      Object.defineProperty(File, 'name', {
        writable: true,
        value: str[0] + '.csv'
      });
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const headerNames: any = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 })[0];
        this.exceljson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        // tslint:disable-next-line:only-arrow-functions
        const isSame = excelheaders.length === headerNames.length && excelheaders.every(function(element, index) {
          return element === headerNames[index];
        });
        if (isSame === false) {
          this.alert.openAlert('Invalid Excel headers', 'Please choose the file to be uploaded');
        } else if (this.exceljson.length === 0) {
          this.alert.openAlert('Excel Sheet is Empty', null);
        } else {
          this.selectedfile = event[0] as File;
          this.alert.openAlert('Uploaded Successfully', null);
        }
      };
      reader.readAsBinaryString(event[0]);
    } else {
      this.alert.openAlert('Invalid File Type', null);
    }
    // }
  }

  /**
   * Save excel
   * @param group :json
   */
  saveexcel(group) {
    if (this.selectedfile && group) {
      const exceldata: any = [];
      this.exceljson.forEach(element => {
        exceldata.push({
          full_name: element.Full_Name, email: element.Email, term_condition: 'true', admin: this.adminDetails._id,
          group_id: group.group_id,
          group_name: group.group_name
        });
      });
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exceldata);
      const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const data: Blob = new Blob([excelBuffer], {
        type: EXCEL_TYPE,
      });
      const fb = new FormData();
      fb.append('csv', data, this.selectedfile.name);
      this.service.bulkuserupload(fb).subscribe((result: any) => {
        if (result.success === true) {
          this.alert.openAlert('Success !', 'Upload in Progress ...');
          this.selectedfile = '';
          this.group = '';
        } else {
          this.selectedfile = '';
          this.alert.openAlert(result.message, null);
        }
      });
    } else {
      this.alert.openAlert('Please Select Group', null);
    }
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.bulkuserupload($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.bulkuserupload(files);
  }

  /**
   * Delete csv file
   */
  deleteFile() {
    Swal.fire({
      title: 'Are you sure you want to delete the uploaded file ?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.selectedfile = '';
      }
    });
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  tabClick(event, form) {
    if (event.index === 0) {
      form.reset();
      this.selectedfile = '';
    }
    if (event.index === 1) {
      this.addUserForm.reset();
    }
  }
}
