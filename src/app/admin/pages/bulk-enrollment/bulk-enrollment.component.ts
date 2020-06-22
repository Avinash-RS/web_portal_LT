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
  adminDetails: any;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private formBuilder: FormBuilder, private gs: GlobalServiceService, private alert: AlertServiceService, private service: AdminServicesService) {
    this.adminDetails = this.gs.checkLogout();
   }


  ngOnInit() {
  }
  /**
   * Download sample excel template
   */
  downloadsampleexceltemplate() {
    const json: any = [{
      course_id: null,
      username: null
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
  bulkenrollment(event) {
    this.selectedfile = '';
    const excelheaders = ['course_id', 'username'];
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
    const exceldata: any = [];
    this.exceljson.forEach(element => {
      exceldata.push({
        course_id: element.course_id, username: element.username, admin: this.adminDetails._id,
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
    fb.append('request_file', data, this.selectedfile.name);
    this.service.bulkenrollment(fb).subscribe((result: any) => {
      if (result.success === true) {
        this.alert.openAlert('Success !', 'Upload in Progress ...');
        this.selectedfile = '';
        // this.group = '';
      } else {
        this.selectedfile = '';
        this.alert.openAlert(result.message, null);
      }
    });
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.bulkenrollment($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.bulkenrollment(files);
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

