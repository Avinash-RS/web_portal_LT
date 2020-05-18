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

  constructor(private gs: GlobalServiceService, private alert: AlertServiceService,
    private adminservice: AdminServicesService, public learnerservice: LearnerServicesService,
    private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
  ) {
    this.adminDetails = this.gs.checkLogout();
  }

  ngOnInit() {
  }

}