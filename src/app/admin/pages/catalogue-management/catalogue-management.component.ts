import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import Swal from 'sweetalert2';

export interface Data {
  course_name: string;
  category_details: [];
  course_language: string;
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
  reverse = false;
  pagenumber = 0;
  pagenumberCourse = 0;
  pagenumberTable = 0;
  totalCount: number;
  catalog: any = {};
  type: string;
  catalogueList = [];
  selectedArray: any = [];
  courseList: any = [];
  ELEMENT_DATA: Data[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['sno', 'course_name', 'category_details', 'course_language'];
  dataSource = new MatTableDataSource<Data>(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  catalogueDetails: { sno: string; courses: string; category: string; language: string; }[];

  constructor(private gs: GlobalServiceService, private alert: AlertServiceService,
    // tslint:disable-next-line:align
    private adminservice: AdminServicesService, public learnerservice: LearnerServicesService,
    // tslint:disable-next-line:align
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

  clickCatalog() {
    this.showCourses = this.showHeader = this.showAddCatalogueForm = this.showCatalogDetail = false;
    this.showListCatalogue = true;
    this.catalog = {};
    this.getListCatalogue();
    this.type = null;
    this.courseList = this.catalogueList = [];
    this.totalCount = null;
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
            // this.getCatalogDetail();
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
    this.getCatalogDetail();
    if (this.catalog.course_count === 0) {
      this.getCoursesForCatalog();
    } else {
      this.showCatalogDetail = this.showHeader = true;
      this.showAddCatalogueForm = this.showListCatalogue = this.showCourses = false;
    }
  }

  getCoursesInCatalog() { // courses mapped to catalog - when click remove
    this.type = 'remove';
    this.courseList = [];
    this.showCourses = this.showHeader = true;
    this.showAddCatalogueForm = this.showListCatalogue = false;
    this.adminservice.getCourseInCatalogue(this.catalog.catalogue_id, this.pagenumberCourse || 0).subscribe((result: any) => {
      this.courseList.push(...result?.data?.getcoursesincatalogue?.message);
      this.totalCount = result?.data?.getcoursesincatalogue?.total_count || result?.data?.getcoursesincatalogue?.message.length;
    });
  }

  getNextCourses() {
    this.pagenumberCourse = this.pagenumberCourse + 1;
    if (this.type === 'add') {
      this.adminservice.getCourseForCatalogue(this.catalog.catalogue_id, this.pagenumberCourse || 0).subscribe((result: any) => {
        this.courseList.push(...result?.data?.getcoursesforcatalogue?.message);
        this.totalCount = result?.data?.getcoursesforcatalogue?.total_count || result?.data?.getcoursesincatalogue?.message.length;
      });
    } else if (this.type === 'remove') {
      this.adminservice.getCourseInCatalogue(this.catalog.catalogue_id, this.pagenumberCourse || 0).subscribe((result: any) => {
        this.courseList.push(...result?.data?.getcoursesincatalogue?.message);
        this.totalCount = result?.data?.getcoursesincatalogue?.total_count || result?.data?.getcoursesincatalogue?.message.length;
      });
    }
  }

  getCoursesForCatalog() { // courses not mapped to catalog - when click add
    this.type = 'add';
    this.courseList = [];
    this.showCourses = this.showHeader = true;
    this.showAddCatalogueForm = this.showListCatalogue = false;
    this.adminservice.getCourseForCatalogue(this.catalog.catalogue_id, this.pagenumberCourse || 0).subscribe((result: any) => {
      this.courseList.push(...result?.data?.getcoursesforcatalogue?.message);
      this.totalCount = result?.data?.getcoursesforcatalogue?.total_count || result?.data?.getcoursesincatalogue?.message.length;
    });
  }

  getCatalogDetail() { // courses mapped to catalog - Table view
    this.loadingCatalogue = true;
    this.adminservice.getallcatalogueById(this.catalog.catalogue_id, this.pagenumberTable || 0).subscribe((result: any) => {
      this.catalog = result.data.getallcatalogue_by_id.message;
      if (this.pagenumberTable === 0) {
        this.ELEMENT_DATA = [];
      }
      Array.prototype.push.apply(this.ELEMENT_DATA, result.data.getallcatalogue_by_id.message.course_details);
      this.dataSource = new MatTableDataSource<Data>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.loadingCatalogue = false;
    });
  }

  getNextCattalogueDetails() {
    this.pagenumberTable = this.pagenumberTable + 1;
    this.adminservice.getallcatalogueById(this.catalog.catalogue_id, this.pagenumberTable || 0).subscribe((result: any) => {
      if (this.pagenumberTable === 0) {
        this.ELEMENT_DATA = [];
      }
      Array.prototype.push.apply(this.ELEMENT_DATA, result.data.getallcatalogue_by_id.message.course_details);
      this.dataSource = new MatTableDataSource<Data>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    });
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
    const arra = this.selectedArray.map((item: any) => item.course_id);
    if (this.type === 'add') {
      this.adminservice.addCourse(this.catalog.catalogue_id, arra, this.checked).subscribe((result: any) => {
        if (result && result.data) {
          if (result.data.coursecataloguemapping?.success) {
            this.alert.openAlert('Courses added successfully', null);
            this.getCoursesForCatalog();
            this.selectedArray = [];
          } else {
            this.selectedArray = [];
            this.alert.openAlert(result.data.coursecataloguemapping?.message, null);
          }
        } else {
          this.selectedArray = [];
          this.alert.openAlert('Please try again later', null);
        }
      });
    } else if (this.type === 'remove') {
      this.adminservice.removeCourse(this.catalog.catalogue_id, arra, this.checked).subscribe((result: any) => {
        if (result && result.data) {
          if (result.data.unmapcoursesfromcatalogue?.success) {
            this.getCoursesInCatalog();
            this.selectedArray = [];
            this.alert.openAlert('Courses removed successfully', null);
          } else {
            this.selectedArray = [];
            this.alert.openAlert(result.data.unmapcoursesfromcatalogue?.message, null);
          }
        } else {
          this.selectedArray = [];
          this.alert.openAlert('Please try again later', null);
        }
      });
    }
  }

  closedialogbox() {
    this.dialog.closeAll();
  }

  openEdit(templateRef: TemplateRef<any>) {
    this.addCatalogueForm = this.formBuilder.group({
      catalogue_name: new FormControl('', myGlobals.req),
      catalogue_description: new FormControl(''),
    });
    this.addCatalogueForm.patchValue(this.catalog);
    this.dialog.open(templateRef);
  }

  editCatalogue() {
    this.addCatalogueForm.reset();
    this.adminservice.updateCatalogDtl(this.addCatalogueForm.value.catalogue_name,
      this.addCatalogueForm.value.catalogue_description,
      this.catalog.catalogue_id).subscribe((result: any) => {
        this.closedialogbox();
        if (result && result.data) {
          if (result.data.updatecatalogueinfo && result.data.updatecatalogueinfo.success) {
            // this.getListCatalogue();
            this.alert.openAlert('Catalogue updated successfully', null);
            // this.showAddCatalogueForm = false;
            // this.showListCatalogue = true;
          } else {
            this.alert.openAlert(result.data.updatecatalogueinfo.message, null);
          }
        } else {
          this.alert.openAlert('Please try again later', null);
        }
      });
  }
}
