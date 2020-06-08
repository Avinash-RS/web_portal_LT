import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../services/common-services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchcourse: any;
  searchName: any;

  // courseName: any;
  constructor(public CommonServices: CommonServicesService) { }

  ngOnInit() {
  }
  searchCourse(event, val) {
    //  var courseName = event.target.value;
    const courseName = val.replace(/^\s+/g, '');
    if (event.keyCode == 32 && !courseName.length) {
      this.CommonServices.globalSearch$.next([]);
      return false;
    }
    var pagenumber = 1;
    this.CommonServices.getCoursesByName(courseName, pagenumber).subscribe(data => {
      this.searchcourse = data.data['getCoursesByName'].message;
      this.CommonServices.globalSearch$.next(this.searchcourse);
      if (this.searchcourse.length == 0) {
        this.searchName = '';
      }
    });

  }
}
