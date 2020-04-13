import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  words2 = [{ value: '' }];
  add(i) {
    
      this.words2.push({ value: '' });
  
  }

  removenewLink(index) {
   
      this.words2.splice(index, 1);
    
  

  }

}
