import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';

export interface Data {
  courses: string;
  category: string;
  language: string;
}

@Component({
  selector: 'app-catalogue-management',
  templateUrl: './catalogue-management.component.html',
  styleUrls: ['./catalogue-management.component.scss']
})

export class CatalogueManagementComponent implements OnInit {

  adminDetails: any;
  addCatalogueForm: any;
  showAddCatalogueForm = false;
  showListCatalogue = true;
  showCourses = false;
  showCatalogDetail = false;
  showHeader = false;
  loadingCatalogue = false;
  checked = false;
  sortCatalogue = 'asc';
  catalogueList = [];
  pagenumber = 0;
  catalog: any;
  type: any;
  selectedArray: any = [];
  courseList: any = [];
  pagenumberCourse: number;
  ELEMENT_DATA: Data[] = [];
  // paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['sno', 'courses', 'category', 'language'];
  dataSource = new MatTableDataSource<Data>(this.ELEMENT_DATA);
  catalogueDetails: { sno: string; courses: string; category: string; language: string; }[];

  constructor(private gs: GlobalServiceService, private alert: AlertServiceService,
              private adminservice: AdminServicesService, public learnerservice: LearnerServicesService,
              private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
  ) {
    this.adminDetails = this.gs.checkLogout();
  }

  ngOnInit() {
    this.getListCatalogue();
  }

  getListCatalogue() {
    this.loadingCatalogue = true;
    this.adminservice.getAllCatalogue(this.pagenumber || 0).subscribe((result: any) => {
      console.log(result?.data?.getallcatalogue?.message);
      this.catalogueList.push(...result?.data?.getallcatalogue?.message);
      this.loadingCatalogue = false;
    });
  }

  sort() {
    console.log(this.sortCatalogue);
    if (this.sortCatalogue === 'asc') {
      this.sortCatalogue = 'dsc';
    } else {
      this.sortCatalogue = 'asc';
    }
  }

  get f() {
    if (this.showAddCatalogueForm === true) {
      return this.addCatalogueForm.controls;
    }
  }

  gotoAdd() {
    this.showListCatalogue = false;
    this.showAddCatalogueForm = true;
    this.addCatalogueForm = this.formBuilder.group({
      catalogue_name: new FormControl('', myGlobals.req),
      catalogue_description: new FormControl(''),
    });
  }

  addNewCatalogue() {
    this.adminservice.addNewCatalogue(this.addCatalogueForm.value.catalogue_name,
      this.addCatalogueForm.value.catalogue_description,
      this.adminDetails._id).subscribe((result: any) => {
        this.addCatalogueForm.reset();
        if (result && result.data) {
          if (result.data.create_master_catalogue && result.data.create_master_catalogue.success) {
            this.getListCatalogue();
            this.alert.openAlert('Catalogue created successfully', null);
            this.showAddCatalogueForm = false;
            this.showListCatalogue = true;
          } else {
            this.alert.openAlert(result.data.create_master_catalogue.message, null);
          }
        } else {
          this.alert.openAlert('Please try again later', null);
        }
      });
  }

  goToCatalogDetail(c) {
    this.catalog = c;
    this.getCatalogDetail(c);
    this.showCatalogDetail = this.showHeader = true;
    this.showAddCatalogueForm = this.showListCatalogue = this.showCourses = false;
  }

  getCoursesInCatalog() { // courses mapped to catalog - when click remove
    this.type = 'remove';
    this.showCourses = this.showHeader = true;
    this.showAddCatalogueForm = this.showListCatalogue = false;
    this.adminservice.getCourseInCatalogue(this.catalog.catalogue_id, this.pagenumberCourse || 0).subscribe((result: any) => {
      this.courseList.push(...result?.data?.getcoursesforcatalogue?.message);
      console.log('it adds', this.courseList);
    });
  }

  getCoursesForCatalog() { // courses not mapped to catalog - when click add
    this.type = 'add';
    this.showCourses = this.showHeader = true;
    this.showAddCatalogueForm = this.showListCatalogue = false;
    this.adminservice.getCourseForCatalogue(this.catalog.catalogue_id, this.pagenumberCourse || 0).subscribe((result: any) => {
      this.courseList.push(...result?.data?.getcoursesforcatalogue?.message);
      console.log('it adds', this.courseList);
    });
  }

  getCatalogDetail(c) { // courses mapped to catalog - when click remove
    this.adminservice.getallcatalogueById(c.catalogue_id).subscribe((result: any) => {
      this.ELEMENT_DATA = [];
      const arr = [];
      arr.push(result.data.getallcatalogue_by_id.message);
      this.ELEMENT_DATA.push(...arr);
      Array.prototype.push.apply(this.ELEMENT_DATA, result.data.getallcatalogue_by_id.message);
      this.dataSource = new MatTableDataSource<Data>(this.ELEMENT_DATA);
      console.log('abcabc', this.ELEMENT_DATA);
    });
    // var arr = [{
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // }
    // ]
    // this.ELEMENT_DATA.push(...arr);
    // this.dataSource = new MatTableDataSource<data>(this.ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
  }

  getNextCattalogueDetails() {
    // var arr = [{
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // },
    // {
    //   sno: "1",
    //   courses: "Web Development",
    //   category: "10",
    //   language: "english"
    // }
    // ]
    // this.ELEMENT_DATA.push(...arr);
    // this.dataSource = new MatTableDataSource<data>(this.ELEMENT_DATA);
  }

  selectCourse(c, id) {
    if (c.isChecked === undefined || c.isChecked === false) {
      c.isChecked = true;
      this.selectedArray.push(c);
    } else {
      c.isChecked = !c.isChecked;
      this.selectedArray = this.selectedArray.filter(i => i !== c);
    }
  }

  saveCourse() {
    if (this.type === 'add') {
      this.adminservice.addCourse(this.catalog.catalogue_id, this.selectedArray, this.checked).subscribe((result: any) => {
        if (result && result.data) {
          if (result.data.coursecataloguemapping?.success) {
            this.alert.openAlert('Courses added successfully', null);
          } else {
            this.alert.openAlert(result.data.coursecataloguemapping?.message, null);
          }
        } else {
          this.alert.openAlert('Please try again later', null);
        }
      });
    } else {
      this.adminservice.removeCourse(this.catalog.catalogue_id, this.selectedArray, this.checked).subscribe((result: any) => {
        if (result && result.data) {
          if (result.data.unmapcoursesfromcatalogue?.success) {
            this.alert.openAlert('Courses added successfully', null);
          } else {
            this.alert.openAlert(result.data.unmapcoursesfromcatalogue?.message, null);
          }
        } else {
          this.alert.openAlert('Please try again later', null);
        }
      });
    }
  }

}
