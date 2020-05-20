import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import * as myGlobals from '@core/globals';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
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
  catalogueList = [];
  pagenumber: number = 0;

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
    // this.adminservice.getAllCatalogue(this.pagenumber || 0).subscribe((result: any) => {
    //   console.log(result?.data?.getallcatalogue?.message)
    //   this.catalogueList = result?.data?.getallcatalogue?.message
    // });
    this.catalogueList = [{
      catalogue_name: "Web Development",
      numberofcourses: "10",
    },
    {
      catalogue_name: "Business Analyst",
      numberofcourses: "30",
    },
    {
      catalogue_name: "Code study",
      numberofcourses: "35",
    },
    {
      catalogue_name: "Web Development",
      numberofcourses: "10",
    },
    {
      catalogue_name: "Business Analyst",
      numberofcourses: "30",
    },
    {
      catalogue_name: "Code study",
      numberofcourses: "35",
    },]
  }

  getNextCattalogue() {
    console.log(++this.pagenumber);
    // this.adminservice.getAllCatalogue(this.pagenumber || 0).subscribe((result: any) => {
    // this.catalogueList.push(...result?.data?.getallcatalogue?.message)
    // console.log(this.catalogueList)
    // });
    this.catalogueList = [{
      catalogue_name: "Web Development",
      numberofcourses: "10",
    },
    {
      catalogue_name: "Business Analyst",
      numberofcourses: "30",
    },
    {
      catalogue_name: "Code study",
      numberofcourses: "35",
    },
    {
      catalogue_name: "Web Development",
      numberofcourses: "10",
    },
    {
      catalogue_name: "Business Analyst",
      numberofcourses: "30",
    },
    {
      catalogue_name: "Code study",
      numberofcourses: "35",
    }, {
      catalogue_name: "Web Development",
      numberofcourses: "10",
    },
    {
      catalogue_name: "Business Analyst",
      numberofcourses: "30",
    },
    {
      catalogue_name: "Code study",
      numberofcourses: "35",
    },
    {
      catalogue_name: "Web Development",
      numberofcourses: "10",
    },
    {
      catalogue_name: "Business Analyst",
      numberofcourses: "30",
    },
    {
      catalogue_name: "Code study",
      numberofcourses: "35",
    }, {
      catalogue_name: "Web Development",
      numberofcourses: "10",
    },
    {
      catalogue_name: "Business Analyst",
      numberofcourses: "30",
    },
    {
      catalogue_name: "Code study",
      numberofcourses: "35",
    },
    {
      catalogue_name: "Web Development",
      numberofcourses: "10",
    },
    {
      catalogue_name: "Business Analyst",
      numberofcourses: "30",
    },
    {
      catalogue_name: "Code study",
      numberofcourses: "35",
    },]
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
}