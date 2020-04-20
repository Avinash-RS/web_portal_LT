import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { MatList } from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.resetList()

  }

  todo = [
    {
      name:"PDF",
      image:"../../../../assets/images/pdf.svg"
    },
    {
      name:"Word",
      image:"../../../../assets/images/word.svg"
    },
    {
      name:"PPT",
      image:"../../../../assets/images/ppt.svg"
    },
    {
      name:"Image",
      image:"../../../../assets/images/image.svg"
    },
    {
      name:"Video",
      image:"../../../../assets/images/video.svg"
    },
    {
      name:"Audio",
      image:"../../../../assets/images/audio.svg"
    },
    {
      name:"SCROM",
      image:"../../../../assets/images/scrom.svg"
    },
    {
      name:"Knowledge Check",
      image:"../../../../assets/images/quiz.svg"
    },
    {
      name:"Feedback",
      image:"../../../../assets/images/feedback.svg"
    },
 

  ];

  items2: any[]

  done = [

    
  ];


  private resetList() {
    this.items2 = [];
    setTimeout(() => {
      this.items2 = this.todo.slice();
    }, 0);    
  }

  drop(event: CdkDragDrop<string[]>) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.done.push(this.items2[event.previousIndex]);


      // transferArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
    }
  }
  

 

  

 

}
