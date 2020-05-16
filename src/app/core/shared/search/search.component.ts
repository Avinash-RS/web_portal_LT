import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '@core/services/common-services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchcourse: any;
  constructor(public CommonServices: CommonServicesService) { }

  ngOnInit() {
  }
  searchCourse(courseName){
    console.log('val',courseName);
    this.CommonServices.getCoursesByName(courseName).subscribe (data => {
      this.searchcourse = data.data['getCoursesByName'].message;
      this.CommonServices.globalSearch$.next(this.searchcourse);
      console.log('name',this.searchcourse);
    });
    
  }
}
