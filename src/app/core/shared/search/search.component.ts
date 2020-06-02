import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../services/common-services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchcourse: any;
  searchName : any;
  
  // courseName: any;
  constructor(public CommonServices: CommonServicesService) { }

  ngOnInit() {

  }
  searchCourse(event) {
    var courseName = event.target.value
   if(event.keyCode == 32 && courseName == ''){
    return false;
   }
   var pagenumber = 1;
      this.CommonServices.getCoursesByName(courseName, pagenumber).subscribe(data => {
      this.searchcourse = data.data['getCoursesByName'].message;
      this.CommonServices.globalSearch$.next(this.searchcourse);
      if(this.searchcourse.length == 0) {
        this.searchName = '';
      }
    });

  }
}
