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
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Excel",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Word",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"PPT",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Image",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Video",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Audio",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"SCROM",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Refrence Files",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Knowledge Check",
      image:"../../../../assets/images/image_upload.svg"
    },
    {
      name:"Feedback",
      image:"../../../../assets/images/image_upload.svg"
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
