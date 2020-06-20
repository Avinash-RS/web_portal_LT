import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-bulk-enrollment',
  templateUrl: './bulk-enrollment.component.html',
  styleUrls: ['./bulk-enrollment.component.scss']
})

export class BulkEnrollmentComponent implements OnInit {

  exceljson: any; // excel json is assigned
  selectedfile = null; // excel file is assigned

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private formBuilder: FormBuilder, private gs: GlobalServiceService, private alert: AlertServiceService, private service: AdminServicesService) { }


  ngOnInit() {
  }
  /**
   * Download sample excel template
   */
  downloadsampleexceltemplate() {
    const json: any = [{
      User_Name: null,
      Course_Id: null
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
    const excelheaders = ['User_Name', 'Course_Id'];
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
        const isSame = excelheaders.length === headerNames.length && excelheaders.every(function (element, index) {
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
  }

  /**
   * Save excel
   * @param group :json
   */
  saveexcel(group) {
    if (this.selectedfile) {
      const fb = new FormData();
      fb.append('csv', this.selectedfile, this.selectedfile.name);
      this.service.bulkuserupload(fb).subscribe((result: any) => {
        if (result.success === true) {
          this.alert.openAlert('Success !', 'Upload in Progress ...');
          this.selectedfile = '';
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



}


// old ts file


// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';
// import * as _ from 'lodash';
// import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
// import { ENTER, COMMA } from '@angular/cdk/keycodes';

// // export interface User {
// //   name: string;
// // }

// @Component({
//   selector: 'app-bulk-enrollment',
//   templateUrl: './bulk-enrollment.component.html',
//   styleUrls: ['./bulk-enrollment.component.scss']
// })

// export class BulkEnrollmentComponent implements OnInit {
  //   groups: any;
  //   singleUserForm: FormGroup;
  //   options = [{ name: 'One' }, { name: 't' }, { name: 'sdfg' }, { name: 'dfsd' }, { name: 'ht' }, { name: 'zsdfg' }];
  //   filteredOptions: Observable<any[]>;
  //   selectedArray: any = [];
  //   lastFilter = '';
  //   selectedgroup = [];
  //   selectable = true;
  //   removable = true;
  //   addOnBlur = true;
  //   separatorKeysCodes: number[] = [ENTER, COMMA]; // for mat chips to add into an array
  //   userList = [{ name: 'One' }, { name: 't' }, { name: 'sdfg' }, { name: 'dfsd' }, { name: 'ht' }, { name: 'zsdfg' }];
  //   @ViewChild('auto') matAutocomplete: MatAutocomplete;
  //   @ViewChild('usergroup') usergroup: ElementRef<HTMLInputElement>;  // mat input values

  // constructor(private formBuilder: FormBuilder, private adminservice: AdminServicesService) {
    // this.singleUserForm = this.formBuilder.group({
    //   group: new FormControl('', myGlobals.req),
    //   userType: ['', myGlobals.req],
    // });
//   }
// }


// ngOnInit() {

//   this.adminservice.getUserGroup()
//     .subscribe((result: any) => {
//       const tree = this.tree(result?.data?.get_user_group?.message, null);
//       this.groups = this.flattree(tree);
//       this.filteredOptions = this.groups;
//       // this.filteredOptions = this.singleUserForm.get('group').valueChanges.pipe(
//       //   startWith(''),
//       //   map(value => typeof value === 'string' ? value : value.group_name),
//       //   map(name => name ? this._filter(name) : this.groups.slice())
//       // );

//       // this.filteredOptions = this.singleUserForm.get('group').valueChanges.pipe(
//       //   startWith(''),
//       //   map(value => this._filter(value))
//       // );
//       this.filteredOptions = this.singleUserForm.get('group').valueChanges.pipe(
//         startWith<string | any[]>(''),
//         map(value => typeof value === 'string' ? value : this.lastFilter),
//         map(filter => this._filter(filter))
//       );
//     });

// }

// tree(data, root) {
//   function setCount(object) {
//     return object.children
//       ? (object.count = object.children.reduce((s, o) => s + 1 + setCount(o), 0))
//       : 0;
//   }
//   const t = {};
//   data.forEach(o => {
//     Object.assign(t[o.group_id] = t[o.group_id] || {}, o);
//     t[o.parent_group_id] = t[o.parent_group_id] || {};
//     t[o.parent_group_id].children = t[o.parent_group_id].children || [];
//     t[o.parent_group_id].children.push(t[o.group_id]);
//     if (o.parent_group_id === root) { t[o.group_id].root = true; }
//   });
//   setCount(t[root]);
//   return t[root].children;
// }

// flattree(items) {
//   const flat = [];
//   items.forEach(item => {
//     flat.push(item);
//     if (Array.isArray(item.children) && item.children.length > 0) {
//       flat.push(...this.flattree(item.children));
//       delete item.children;
//     }
//     delete item.children;
//   });
//   return flat;
// }


// // displayFn(user: any): string {
// //   return user && user.group_name ? user.group_name : '';
// // }


// displayFn(value: any[] | string): string | undefined {
//   let displayValue: string;
//   if (Array.isArray(value)) {
//     value.forEach((user, index) => {
//       if (index === 0) {
//         displayValue = user.group_name;
//       } else {
//         displayValue += ', ' + user.group_name;
//       }
//     });
//   } else {
//     displayValue = value;
//   }
//   return displayValue;
// }

//   private _filter(name: string): string[] {
//   // const filterValue = name.toLowerCase();
//   // return this.groups.filter(option => option.group_name.toLowerCase().indexOf(filterValue) === 0);
//   this.lastFilter = name;
//   if (name) {
//     return this.groups.filter(option => {
//       return option.group_name.toLowerCase().indexOf(name.toLowerCase()) >= 0
//         || option.group_name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
//     });
//   } else {
//     return this.groups.slice();
//   }

// }

// checkboxLabel(row ?) {
//   if (row.isChecked === undefined || row.isChecked === false) {
//     row.isChecked = true;
//     this.selectedArray.push(row);
//   } else {
//     row.isChecked = !row.isChecked;
//     this.selectedArray = this.selectedArray.filter(i => i !== row);
//   }
//   console.log(this.selectedArray);
//   // this.userControl.setValue(this.selectedUsers);
//   this.singleUserForm.get('group').setValue(this.selectedArray);
//   console.log(this.singleUserForm);

// }

// // toggleSelection(user: any) {
// //   user.selected = !user.selected;
// //   if (user.selected) {
// //     this.selectedUsers.push(user);
// //   } else {
// //     const i = this.selectedUsers.findIndex(value => value.firstname === user.firstname && value.lastname === user.lastname);
// //     this.selectedUsers.splice(i, 1);
// //   }

// //   this.userControl.setValue(this.selectedUsers);
// // }

// selected(event: MatAutocompleteSelectedEvent): void {
//   console.log(event.option.viewValue);
//   this.singleUserForm.get('group').valueChanges.subscribe((grp) => {
//     this.getGrpUser();
//   });
//   this.selectedgroup.push({ group_name: event.option.viewValue });
//   this.usergroup.nativeElement.value = '';
//   this.singleUserForm.get('group').setValue(null);
// }

// remove(indx): void {
//   this.selectedgroup.splice(indx, 1);
// }


// ///////////////////////////////////////////////////
// filterOptions(filterValue: string) {
//   setTimeout(() => {
//     if (filterValue.trim().toLowerCase().length > 3) {
//       this.adminservice.searchUserInGroup(filterValue.trim().toLowerCase(), this.singleUserForm.value.group[0].group_id)
//         .subscribe((result: any) => {
//           if (result.data.search_user.success && result.data.search_user.message && result.data.search_user.message.length > 0) {
//             this.userList = result.data.search_user.message;
//           } else {
//             // this.alert.openAlert('Sorry', "User doesn't exist");
//           }

//         });
//     } else if (filterValue.trim().toLowerCase().length === 0) {
//       // this.getAllUser(0);
//     }
//   }, 1000);
// }

//   // public filterOptions(filter: string): void {
//   // this.options = this.userList.filter(x => x.username.toLowerCase().includes(filter.toLowerCase()));
// // }

// getGrpUser() {
//   console.log(this.singleUserForm.value.group);
//   this.adminservice.getAllUsers(0, 1, this.singleUserForm.value.group.group_id)
//     .subscribe((result: any) => {
//       if (result.data && result.data.get_all_user) {
//         // console.log(result.data.get_all_user);
//         this.userList = result.data.get_all_user.message;
//       }
//     });
// }
// }
