import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { AdminServicesService } from '@admin/services/admin-services.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-catalogue-management',
  templateUrl: './catalogue-management.component.html',
  styleUrls: ['./catalogue-management.component.css']
})
export class CatalogueManagementComponent implements OnInit {
  adminDetails: any;

  constructor(private gs: GlobalServiceService,private alert: AlertServiceService,  private adminservice: AdminServicesService, 
    private formBuilder: FormBuilder, private router: Router) {
    this.adminDetails = this.gs.checkLogout();
    console.log(this.adminDetails )
   }

  ngOnInit() {

  }

}
