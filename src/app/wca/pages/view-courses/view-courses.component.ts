import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { WcaService } from '@wca/services/wca.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss']
})
export class ViewCoursesComponent implements OnInit {

  moduleData;
  isHover: any;
  currentTop: any;
  currentText: any;
  modifiedData: { moduleid: string; modulestatus: string; createdby: string; };
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog,
              public toast: ToastrService,
              private apiService: WcaService,
  ) { }

  ngOnInit() {
    this.moduleData = this.data.module;
    this.moduleData.isActivated = this.moduleData.modulestatus === 'true' ? true : false;
    this.moduleData.createdon = this.moduleData.createdon ? new Date(this.moduleData.createdon) : '';
    this.moduleData.coursedetails.forEach((data) => {
      data.createdon = data.createdon ? new Date(data.createdon) : '';
    });

  }

  closeDialog() {
    this.dialog.closeAll();
  }

  onHover(e) {

    if (e.currentTarget.offsetWidth < e.currentTarget.scrollWidth) {
      this.isHover = true;
      this.currentText = e.target.outerText;
      this.currentTop = {
        top: e.clientY + 10,
        left: e.clientX
      };
    }
  }
  onhoverLeave() {
    this.currentText = '';
    this.isHover = false;
  }

  deactivateModule(e) {
    this.modifiedData = {
      moduleid: this.moduleData.moduleid,
      modulestatus: String(!e.checked),
      createdby: this.moduleData.createdby ? this.moduleData.createdby : ''
    };
    const msg = e.checked ? 'Module deactivated successfully' : 'Module activated successfully';
    this.apiService.deactivateModule(this.modifiedData).subscribe((res: any) => {
      if (res.Code === 200) {
        this.toast.success(msg);
      }
    });
  }
}
