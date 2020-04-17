import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mycreated-course',
  templateUrl: './mycreated-course.component.html',
  styleUrls: ['./mycreated-course.component.scss']
})
export class MycreatedCourseComponent implements OnInit {

  @Input() courseId: string;

  constructor() { }

  ngOnInit() {
  }

}
