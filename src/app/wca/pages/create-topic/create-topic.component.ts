import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  done = [
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
    
 

  ];

}
