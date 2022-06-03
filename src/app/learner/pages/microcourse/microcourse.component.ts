import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';
import { AlertServiceService } from '@core/services/handlers/alert-service.service';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-microcourse',
  templateUrl: './microcourse.component.html',
  styleUrls: ['./microcourse.component.scss']
})
export class MicrocourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
