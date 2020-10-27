import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '@core/services/common-services.service';

@Component({
  selector: 'app-performance-page-mobile',
  templateUrl: './performance-page-mobile.component.html',
  styleUrls: ['./performance-page-mobile.component.scss']
})
export class PerformancePageMobileComponent implements OnInit {
  selectedName = 'Perform';
  selectedTabIndex: number;
  performdetailPage = false;
  arrowUP = false;
  videoPerview = false;
  @Input() detailDataToPerform;
  @Input() courceDetails;
  @Output() menuSelected = new EventEmitter<any>();

  constructor(private commonServices: CommonServicesService) {}

  ngOnInit() {
  }

  emiteData() {
    let data = {selectedName: this.selectedName, selectedTabIndex: this.selectedTabIndex};
    console.log('data', data);
    this.commonServices.menuSelectedPerform$.next(data);
  }

}
