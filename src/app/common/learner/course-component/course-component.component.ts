import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-component',
  templateUrl: './course-component.component.html',
  styleUrls: ['./course-component.component.scss']
})
export class CourseComponentComponent implements OnInit {
  @Input('course') course : any;

    constructor() { }

  ngOnInit() {
    console.log(this.course)
  }

}
