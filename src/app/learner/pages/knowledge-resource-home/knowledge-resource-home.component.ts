import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearnerServicesService } from '@learner/services/learner-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-knowledge-resource-home',
  templateUrl: './knowledge-resource-home.component.html',
  styleUrls: ['./knowledge-resource-home.component.scss']
})
export class KnowledgeResourceHomeComponent implements OnInit {

  searchDetails: any;
  details: any;

  constructor(private router: Router,
              private toastr: ToastrService,
              private loader: Ng4LoadingSpinnerService,
              public service: LearnerServicesService) { }

  ngOnInit() {
    this.getResourcesDetail();
  }

  getResourcesDetail(){
    this.service.getResourceDetails().subscribe((result: any) => {
      console.log(result, 'resourceData');
      this.details = result.data.get_all_resources_details.message;
      console.log(this.details, 'details');
    });
  }


}
