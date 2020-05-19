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
  courses = [
    {
      cataloguename: "Web Development",
      numberofcourses: "10",
    },
    {
      cataloguename: "Business Analyst",
      numberofcourses: "30",
    },
    {
      cataloguename: "Code study",
      numberofcourses: "35",
    },
    {
      cataloguename: "Web Development",
      numberofcourses: "10",
    },
    {
      cataloguename: "Business Analyst",
      numberofcourses: "30",
    },
    {
      cataloguename: "Code study",
      numberofcourses: "35",
    },
  ];

  constructor(private gs: GlobalServiceService, private alert: AlertServiceService,
    private adminservice: AdminServicesService, public learnerservice: LearnerServicesService,
    private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
  ) {
    this.adminDetails = this.gs.checkLogout();
  }

  ngOnInit() {
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
    console.log(this.addCatalogueForm)
    console.log(this.adminDetails)
    this.adminservice.addNewCatalogue(this.addCatalogueForm.value.catalogue_name, this.addCatalogueForm.value.catalogue_description,
      this.adminDetails._id).subscribe((result: any) => {
        // this.subCategoryArray = result.data.get_sub_category.message;
        console.log(result)
      });
  }

}