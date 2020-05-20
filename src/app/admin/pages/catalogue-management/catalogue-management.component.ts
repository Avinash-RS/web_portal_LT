import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { MatDialog, MatTableDataSource,MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';

export interface data {
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
  showAddCatalogueForm: boolean = false;
  showListCatalogue: boolean = true;
  showCourses: boolean = false;
  showCatalogDetail: boolean = false;
  catalogueList = [];
  pagenumber: number = 0;
  catalog: any;
  ELEMENT_DATA: data[] = [];
  // paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['sno', 'courses', 'category', 'language'];
  dataSource = new MatTableDataSource<data>(this.ELEMENT_DATA);
  catalogueDetails: { sno: string; courses: string; category: string; language: string; }[];

  constructor(private gs: GlobalServiceService, private alert: AlertServiceService,
    private adminservice: AdminServicesService, public learnerservice: LearnerServicesService,
    private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
  ) {
    this.adminDetails = this.gs.checkLogout();
  }

  ngOnInit() {
    this.getListCatalogue()
  }

  getListCatalogue() {
    this.adminservice.getAllCatalogue(this.pagenumber || 0).subscribe((result: any) => {
      // console.log(result?.data?.getallcatalogue?.message)
      this.catalogueList = result?.data?.getallcatalogue?.message
    });
    // this.catalogueList = [{
    //   catalogue_name: "Web Development",
    //   numberofcourses: "10",
    // },
    // {
    //   catalogue_name: "Business Analyst",
    //   numberofcourses: "30",
    // },
    // {
    //   catalogue_name: "Code study",
    //   numberofcourses: "35",
    // },
    // {
    //   catalogue_name: "Web Development",
    //   numberofcourses: "10",
    // },
    // {
    //   catalogue_name: "Business Analyst",
    //   numberofcourses: "30",
    // },
    // {
    //   catalogue_name: "Code study",
    //   numberofcourses: "35",
    // },]
  }

  getNextCattalogue() {
    console.log(++this.pagenumber);
    this.adminservice.getAllCatalogue(this.pagenumber || 0).subscribe((result: any) => {
      this.catalogueList.push(...result?.data?.getallcatalogue?.message)
      // console.log(this.catalogueList)
    });
    // this.catalogueList = [{
    //   catalogue_name: "Web Development",
    //   numberofcourses: "10",
    // },
    // {
    //   catalogue_name: "Business Analyst",
    //   numberofcourses: "30",
    // },
    // {
    //   catalogue_name: "Code study",
    //   numberofcourses: "35",
    // },
    // {
    //   catalogue_name: "Web Development",
    //   numberofcourses: "10",
    // },
    // {
    //   catalogue_name: "Business Analyst",
    //   numberofcourses: "30",
    // },
    // {
    //   catalogue_name: "Code study",
    //   numberofcourses: "35",
    // }, {
    //   catalogue_name: "Web Development",
    //   numberofcourses: "10",
    // },
    // {
    //   catalogue_name: "Business Analyst",
    //   numberofcourses: "30",
    // },
    // {
    //   catalogue_name: "Code study",
    //   numberofcourses: "35",
    // },
    // {
    //   catalogue_name: "Web Development",
    //   numberofcourses: "10",
    // },
    // {
    //   catalogue_name: "Business Analyst",
    //   numberofcourses: "30",
    // },
    // {
    //   catalogue_name: "Code study",
    //   numberofcourses: "35",
    // }, {
    //   catalogue_name: "Web Development",
    //   numberofcourses: "10",
    // },
    // {
    //   catalogue_name: "Business Analyst",
    //   numberofcourses: "30",
    // },
    // {
    //   catalogue_name: "Code study",
    //   numberofcourses: "35",
    // },
    // {
    //   catalogue_name: "Web Development",
    //   numberofcourses: "10",
    // },
    // {
    //   catalogue_name: "Business Analyst",
    //   numberofcourses: "30",
    // },
    // {
    //   catalogue_name: "Code study",
    //   numberofcourses: "35",
    // },]
  }

  get f() {
    if (this.showAddCatalogueForm == true) {
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
    this.adminservice.addNewCatalogue(this.addCatalogueForm.value.catalogue_name, this.addCatalogueForm.value.catalogue_description,
      this.adminDetails._id).subscribe((result: any) => {
        this.addCatalogueForm.reset();
        if (result && result.data) {
          if (result.data.create_master_catalogue && result.data.create_master_catalogue.success) {
            this.getListCatalogue();
            this.alert.openAlert('Catalogue created successfully', null);
            this.showAddCatalogueForm = false;
            this.showListCatalogue = true;
          } else
            this.alert.openAlert(result.data.create_master_catalogue.message, null);
        } else
          this.alert.openAlert('Please try again later', null);
      });
  }

  goToCatalogDetail(c) {
    this.catalog = c;
    this.getCatalogDetail(c);
    this.showCatalogDetail = true;
    this.showAddCatalogueForm = this.showListCatalogue = this.showCourses = false
    //add true false variable here - jasper
  }

  getCoursesInCatalog() { // courses mapped to catalog - when click remove
    this.adminservice.getCourseInCatalogue(this.catalog.catalogue_id, this.pagenumber || 0).subscribe((result: any) => {
      // declare array
    });
  }

  getCoursesForCatalog() { // courses not mapped to catalog - when click add
    this.adminservice.getCourseForCatalogue(this.catalog.catalogue_id, this.pagenumber || 0).subscribe((result: any) => {
      // declare array
    });
  }

  getCatalogDetail(c) { // courses mapped to catalog - when click remove
    // this.adminservice.getallcatalogueById(c.catalogue_id).subscribe((result: any) => {
    // declare array
    // this.ELEMENT_DATA = [];
    // var arr = [];
    // arr.push(result.data.getallcatalogue_by_id.message);
    // this.ELEMENT_DATA.push(...arr);
    // Array.prototype.push.apply(this.ELEMENT_DATA, result.data.getallcatalogue_by_id.message);
    // this.dataSource = new MatTableDataSource<data>(this.ELEMENT_DATA);

    // console.log("abcabc", this.ELEMENT_DATA)
    // });
    var arr = [{
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    }
    ]
    this.ELEMENT_DATA.push(...arr);
    this.dataSource = new MatTableDataSource<data>(this.ELEMENT_DATA);
    // this.dataSource.paginator = this.paginator;
  }
   
  getNextCattalogueDetails(){
    var arr = [{
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    },
    {
      sno: "1",
      courses: "Web Development",
      category: "10",
      language: "english"
    }
    ]
    this.ELEMENT_DATA.push(...arr);
    this.dataSource = new MatTableDataSource<data>(this.ELEMENT_DATA);
  }
  }
