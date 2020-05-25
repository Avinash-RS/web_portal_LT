import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  ngOnInit() {
    this.moduleData = this.data.module
    this.moduleData.createdon = this.moduleData.createdon ? new Date(this.moduleData.createdon) : '';
    this.moduleData.coursedetails.forEach((data) => {
      data.createdon = data.createdon ? new Date(data.createdon) : '';
    })

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
      }
    }
  }
  onhoverLeave() {
    this.currentText = '';
   this.isHover = false;
  }
}
