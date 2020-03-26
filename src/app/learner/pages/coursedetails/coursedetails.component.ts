import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.scss']
})
export class CoursedetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  scroll(el: HTMLElement) {
    console.log(el)
    el.scrollIntoView();
  }
  coursePlay() {
    
  }
}
