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

  
  words1 = [{ value: '' }];

  add(i) {
    
      this.words1.push({ value: '' });
  
  }

  removenewLink(index) {
   
      this.words1.splice(index, 1);
    
  }


  words2 = [{ value: '' }];
  add1(i) {
    
      this.words2.push({ value: '' });
  
  }

  removenewLink1(index) {
   
      this.words2.splice(index, 1);
    
  }

}
